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
            var checkEmail = _db.Users.Where(e => e.Email == userInfo.Email || e.FullName == userInfo.FullName).FirstOrDefault();

            if (checkEmail != null)
            {
                return BadRequest("Email or Username is elready use!");
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

            return Ok(new { UserId = user.UserId, UserName = user.FullName, Flag = user.FlatType});
        }


        [HttpGet("GetUserInformation/{userId}")]
        public IActionResult GetUserInformation(int userId)
        {

            var info = _db.Users.FirstOrDefault(u => u.UserId == userId);

            if (info == null)
            {
                NotFound("user not found");
            }

            return Ok(info);
        }



        [HttpPost("UpdateUserInfo/{userId}")]
        public IActionResult updateUserInfo([FromForm] UserInformationRequestDTO userInfo,  int userId)
        {

            var user = _db.Users.Find(userId);

            if (user == null)
            {
                return NotFound("User not found");
            }


            user.FullName = userInfo.FullName ?? user.FullName;
            user.Email = userInfo.Email ?? user.Email;
            user.Address = userInfo.Address ?? user.Address;
            user.MedicalStatus = userInfo.MedicalStatus ?? user.MedicalStatus;
            user.FlatType = userInfo.FlatType ?? user.FlatType;
            user.FinancialStatus = userInfo.FinancialStatus ?? user.FinancialStatus;
            user.HaveKids = userInfo.HaveKids ?? user.HaveKids;
            user.MoreDetails = userInfo.MoreDetails ?? user.MoreDetails;


            if (!string.IsNullOrEmpty(userInfo.Password))
            {

                byte[] passwordHash, passwordSalt;
                PasswordHashDTO.CreatePasswordHash(userInfo.Password, out passwordHash, out passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.Password = userInfo.Password;
            }

            _db.Users.Update(user);
            _db.SaveChanges();

            return Ok(user);
        }



        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
        {

            var allUSers = _db.Users.ToList();

            return Ok(allUSers);
        }

    }
}
