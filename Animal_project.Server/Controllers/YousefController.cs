using Animal_project.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Animal_project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YousefController : ControllerBase
    {
        private readonly MyDbContext _db;

        public YousefController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllMessage")]
        public IActionResult GetAllMessage()
        {
            var GetAllMessage = _db.Comments.ToList();

            return Ok(GetAllMessage);
        }




    }
}
