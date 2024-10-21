using Animal_project.Server.DTO;
using Animal_project.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Animal_project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OmarController : ControllerBase
    {
        private readonly MyDbContext _db;

        public OmarController(MyDbContext db)
        {
            _db = db;
        }

        [HttpPost("Register")]
        public IActionResult Register([FromForm] UserInformationRequestDTO userInfo)
        {
            var checkEmail = _db.Users.Where(e => e.Email == userInfo.Email).FirstOrDefault();

            if (checkEmail != null)
            {
                return BadRequest("Email is elready excest use another email.");
            }


            byte[] passwordHash, passwordSalt;
            PasswordHashDTO.CreatePasswordHash(userInfo.Password, out passwordHash, out passwordSalt);

            User addUser = new User
            {
                FullName = userInfo.FullName,

                Email = userInfo.Email,

                Password = userInfo.Password,

                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,

                IsAdmin = false
            };

            _db.Users.Add(addUser);
            _db.SaveChanges();

            return Ok();
        }

        [HttpPost("Login")]
        public IActionResult Login([FromForm] UserInformationRequestDTO userInfo)
        {
            var user = _db.Users.FirstOrDefault(e => e.Email == userInfo.Email);

            if (user == null || !PasswordHashDTO.VerifyPasswordHash(userInfo.Password, user.PasswordHash, user.PasswordSalt))
            {
                return Unauthorized("Invalid Email or Password.");
            }

            return Ok(new { UserId = user.UserId });
        }



    }
}
