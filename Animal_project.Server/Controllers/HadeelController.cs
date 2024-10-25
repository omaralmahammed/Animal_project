using Animal_project.Server.DTO;
using Animal_project.Server.Models;
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
        public IActionResult adminapproved(int id)
        {
            var animal = _db.AdoptionApplications.FirstOrDefault(x => x.ApplicationId == id);

            if (animal == null)
            {
                return NotFound();
            }

            animal.Status = "Approved";
            _db.AdoptionApplications.Update(animal);
            _db.SaveChanges();

            var a = _db.Animals.FirstOrDefault(z => z.AnimalId == animal.AnimalId);
            if (a == null)
            {
                return NotFound();
            }
            _db.Animals.Remove(a);
            _db.SaveChanges();

            return Ok();
        }

        //[HttpGet("GetAdoptionAnimalsByCategoryId/{categoryId}")]
        //public IActionResult AnimalsByCategoryId(int categoryId)
        //{
        //    if (categoryId <= 0)
        //    {
        //        return BadRequest("Invalid category ID");
        //    }

        //    var animals = _db.Animals.Where(a => a.CategoryId == categoryId).ToList();

        //    if (animals == null || !animals.Any())
        //    {
        //        return NotFound("No animals found for the given category ID");
        //    }

        //    return Ok(animals);
        //}
    }
}
