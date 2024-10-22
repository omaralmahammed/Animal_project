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
            var user = _db.Users.Where(x => x.UserId == id);
            var u = new User
            {
                UserId = dTO.UserId,
                FullName = dTO.FullName,
                Email = dTO.Email,
                Address = dTO.Address,
                MedicalStatus = dTO.MedicalStatus,
                FlatType = dTO.FlatType,
                FinancialStatus = dTO.FinancialStatus,
                HaveKids = dTO.HaveKids,
                MoreDetails = dTO.MoreDetails,
                PhoneNo = dTO.PhoneNumber,
            };
            _db.Users.Add(u);
            _db.SaveChanges();

            var f = new AdoptionApplication
            {
                AnimalId =dTO.AnimalId,
                ApplicationDate = dTO.ApplicationDate,
                Status = dTO.Status,
            };

            _db.AdoptionApplications.Add(f);
            _db.SaveChanges();

            return Ok();
        }

    }
}
