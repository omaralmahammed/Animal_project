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
            var animal = _db.AdoptionApplications.Where(x => x.AnimalId == id);

            if (animal == null)
            {
                return NotFound();
            }
            else
            {
                
            }
            //_db.AdoptionApplications;
            //_db.SaveChanges();


            return Ok();
        }

    }
}
