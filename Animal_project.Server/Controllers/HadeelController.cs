using Animal_project.Server.DTO;
using Animal_project.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Animal_project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HadeelController : ControllerBase
    {
        private readonly MyDbContext _db;

        public HadeelController(MyDbContext db)
        {
            _db = db;
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


        [HttpPut("AdminApproved")]
        public IActionResult adminapproved(int id, hadeelFormDTO dTO)
        {
            var animal = _db.AdoptionApplications.FirstOrDefault(x => x.AnimalId == id);

            if (animal == null)
            {
                return NotFound();
            }

            animal.Status = "Approved";
            _db.AdoptionApplications.Update(animal);
            _db.SaveChanges();

            var a = _db.Animals.FirstOrDefault(z => z.AnimalId == id);
            if (a == null)
            {
                return NotFound();
            }
            _db.Animals.Remove(a);
            _db.SaveChanges();

            return Ok();
        }

    }
}
