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
            var user = _db.Users.Where(e => e.Email == userInfo.Email).FirstOrDefault();

            if (user == null || !PasswordHashDTO.VerifyPasswordHash(userInfo.Password, user.PasswordHash, user.PasswordSalt))
            {
                return Unauthorized("Invalid Email or Password.");
            }

            return Ok(new { UserId = user.UserId, Flag = user.IsAdmin, userName = user.FullName });
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


        [HttpPost("UpdateUserInformation/{userId}")]
        public IActionResult UpdateUserInformation([FromForm] UserInformationRequestDTO editUser, int userId)
        {

            var user = _db.Users.Find(userId);

            if (user == null)
            {
                NotFound("user not found");
            }

            user.FullName = editUser.FullName ?? user.FullName;
            user.Email = editUser.Email ?? user.Email;
            user.PhoneNo = editUser.PhoneNo ?? user.PhoneNo;
            user.Address = editUser.Address ?? user.Address;
            user.MedicalStatus = editUser.MedicalStatus ?? user.MedicalStatus;
            user.FlatType = editUser.FlatType ?? user.FlatType;
            user.FinancialStatus = editUser.FinancialStatus ?? user.FinancialStatus;
            user.HaveKids = editUser.HaveKids ?? user.HaveKids;
            user.MoreDetails = editUser.MoreDetails ?? user.MoreDetails;


            if (!string.IsNullOrEmpty(editUser.Password))
            {

                byte[] passwordHash, passwordSalt;
                PasswordHashDTO.CreatePasswordHash(editUser.Password, out passwordHash, out passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.Password = editUser.Password;
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


        [HttpGet("GetRandomFourAnimals")]
        public IActionResult GetRandomFourAnimals()
        {

            var animals = _db.Animals
                .OrderBy(a => Guid.NewGuid())
                .Take(4)
                .ToList();
            return Ok(animals);
        }


        [HttpGet("GetRandomFourCategory")]
        public IActionResult GetRandomFourCategory()
        {

            var categories = _db.Categories
                .OrderBy(a => Guid.NewGuid())
                .Take(3)
                .ToList();
            return Ok(categories);
        }



        [HttpGet("GetRandomFourPost")]
        public IActionResult GetRandomFourPost()
        {

            var posts = _db.Posts
                .OrderBy(a => Guid.NewGuid())
                .Take(4)
                .ToList();
            return Ok(posts);
        }
    }
}
