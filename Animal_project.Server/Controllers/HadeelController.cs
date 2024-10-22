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

        [HttpPost("AddUserForm")]
        public IActionResult adduserform(int id, hadeelFormDTO dTO)
        {
            var animal = _db.Animals.Where(x => x.AnimalId == id);
            if (animal == null)
            {
                return NotFound();
            }
            else
            {
                var f = new AdoptionApplication
                {
                    ApplicationId = dTO.ApplicationId,
                    UserId = dTO.UserId,
                    AnimalId = dTO.AnimalId,
                    ApplicationDate = dTO.ApplicationDate,
                    Status = "pending",

                };

                _db.AdoptionApplications.Add(f);
                _db.SaveChanges();
            }
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
            else
            {
                animal.Status = "Approved";
                _db.AdoptionApplications.Update(animal);
                _db.SaveChanges();
            }

            var a = _db.Animals.FirstOrDefault(z => z.AnimalId == id);
            _db.Animals.Remove(a);
            _db.SaveChanges();

            return Ok();
        }

    }
}
