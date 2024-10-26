using Animal_project.Server.DTO;
using Animal_project.Server.Models;
using Animal_project.Server.Service;
using Animal_project.Server.youseFDTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Animal_project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HadeelController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly EmailServices _emailServices;

        public HadeelController(MyDbContext db, EmailServices emailService)
        {
            _db = db;
            _emailServices = emailService;
        }

        [HttpGet("GetAnimalDetails")]
        public IActionResult GetAnimalDetails(int id)
        {
            var animal = _db.Animals
                 .Where(x => x.AnimalId == id)
                 .Select(x => new
                 {
                     x.Size,
                     x.Name,
                     x.Species,
                     x.Breed,
                     x.Age,
                     x.SpecialNeeds,
                     x.Description,
                     x.AdoptionStatus
                 })
                 .FirstOrDefault();


            return Ok(animal);
        }

        [HttpPost("AddUserForm/{userId}/{animalId}")]
        public IActionResult adduserform([FromForm] UserInformationRequestDTO requestData, int userId, int animalId) // USer iNformation inside DTO
        {
            var user = _db.Users.Find(userId);

            user.FullName = requestData.FullName ?? user.FullName;
            user.Email = requestData.Email ?? user.Email;
            user.PhoneNo = requestData.PhoneNo ?? user.PhoneNo;
            user.Address = requestData.Address ?? user.Address;
            user.MedicalStatus = requestData.MedicalStatus ?? user.MedicalStatus;
            user.FlatType = requestData.FlatType ?? user.FlatType;
            user.FinancialStatus = requestData.FinancialStatus ?? user.FinancialStatus;
            user.HaveKids = requestData.HaveKids ?? user.HaveKids;
            user.MoreDetails = requestData.MoreDetails ?? user.MoreDetails;


            _db.Users.Update(user);
            _db.SaveChanges();

            var app = new AdoptionApplication
            {
                UserId = userId,
                AnimalId = animalId,
                ApplicationDate = DateTime.Now,
                Status = "pending",
            };

            _db.AdoptionApplications.Add(app);
            _db.SaveChanges();



            return Ok();
        }


        [HttpGet("GetDetailsAllOrder")]
        public IActionResult GetDetailsAllOrder(int id)
        {
            var adoptionApplication = _db.AdoptionApplications
                .Where(x => x.ApplicationId == id)
                .Include(x => x.User)  // Include related User data
                .Include(x => x.Animal)  // Include related Animal data
                .Select(x => new
                {
                    ApplicationId = x.ApplicationId,
                    ApplicationDate = x.ApplicationDate,
                    // User information
                    UserName = x.User.FullName,
                    UserEmail = x.User.Email,
                    UserPhone = x.User.PhoneNo,
                    Address = x.User.Address,
                    MedicalStatus = x.User.MedicalStatus,
                    FlatType = x.User.FlatType,
                    FinancialStatus = x.User.FinancialStatus,
                    HaveKids = x.User.HaveKids,
                    MoreDetails = x.User.MoreDetails,

                    // Animal information
                    AnimalName = x.Animal.Name,
                    AnimalType = x.Animal.Species,
                    AnimalBreed = x.Animal.Breed,
                    Description = x.Animal.Description,
                })
                .FirstOrDefault();

            if (adoptionApplication == null)
            {
                return BadRequest("Application not found.");
            }

            return Ok(adoptionApplication);
        }

        [HttpGet("GetAllOrder")]
        public IActionResult GetAllOrder()
        {
            var app = _db.AdoptionApplications.ToList();
            return Ok(app);
        }

        [HttpPut("AdminApproved")]
        public async Task<IActionResult> adminapproved(int id)
        {
            var application = await _db.AdoptionApplications
                .Include(u => u.User)
                .FirstOrDefaultAsync(x => x.ApplicationId == id);

            if (application == null)
            {
                return NotFound();
            }

            // Approve the application
            application.Status = "Approved";
            application.IsReceived = true;

            _db.AdoptionApplications.Update(application);
            await _db.SaveChangesAsync();


            var animal = await _db.Animals.FirstOrDefaultAsync(z => z.AnimalId == application.AnimalId);

            if (animal == null)
            {
                return NotFound();
            }

            // Update the animal's status
            animal.AdoptionStatus = "Not Available";
            _db.Animals.Update(animal);
            await _db.SaveChangesAsync();

            // Find rejected applications
            var rejectedApplications = await _db.AdoptionApplications
                .Include(u => u.User)
                .Where(z => z.AnimalId == application.AnimalId && z.ApplicationId != id )
                .ToListAsync();

            // Send email to approved applicant
            string approvalSubject = "Congratulations ..!!";
            string approvalBody = $@"
                            <p>Dear {application.User.FullName},</p>
                            <p>Thank you for using our service. Your Adoption Application for <b>{animal.Name}</b> is completed successfully:</p>
                            <br>
                            <p>Best Regards,</p>
                            <p>The Admin</p>
                        ";

            await _emailServices.SendEmailRAsync(application.User.Email, approvalSubject, approvalBody);

            // Handle rejected applications
            if (rejectedApplications != null && rejectedApplications.Any())
            {
                foreach (var rejectedApplication in rejectedApplications)
                {
                    rejectedApplication.Status = "Rejected";
                    _db.AdoptionApplications.Update(rejectedApplication);
                }
                await _db.SaveChangesAsync(); // Save the status update for rejected applications

                // Send rejection emails
                var emailTasks = rejectedApplications.Select(async rejectedApplication =>
                {
                    string subject = "Sorry ..!!";
                    string rejectionBody = $@"
                                    <p>Dear {rejectedApplication.User.FullName},</p>
                                    <p>Thank you for using our service. Your Adoption Application for <b>{animal.Name}</b> is rejected:</p>
                                    <br>
                                    <p>Best Regards,</p>
                                    <p>The Admin</p>
                                ";

                    await _emailServices.SendEmailRAsync(rejectedApplication.User.Email, subject, rejectionBody);
                });

                await Task.WhenAll(emailTasks); 
            }

            return Ok();
        }



    }
}
