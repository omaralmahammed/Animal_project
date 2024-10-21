using Animal_project.Server.DTO;
using Animal_project.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace Animal_project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RaneemController : ControllerBase
    {

        private readonly MyDbContext _db;

        public RaneemController(MyDbContext db)
        {
            _db = db;
        }


        [HttpGet("GetAllCategory")]
        public IActionResult GetAllCategory()
        {
            var recipe = _db.Categories.ToList();
            if (recipe == null)
            {
                return NoContent();
            }
            return Ok(recipe);
        }
        [HttpGet("GetcategoryById/{id}")]
        public IActionResult GetcategoryById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid category ID");
            }
            var recipe = _db.Categories.Where(p => p.CategoryId == id).FirstOrDefault();
            if (recipe == null)
            {
                return NotFound("No category found for the given category ID");
            }
            return Ok(recipe);
        }

        [HttpPost("CreateCategory")]
        public IActionResult CreateCategory([FromForm] categoryRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Name))
            {
                return BadRequest("Invalid category data");
            }

           

            // تحميل الصورة
            if (request.Image != null)
            {

                var folder = Path.Combine(Directory.GetCurrentDirectory(), "images");

                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }
                var imageFile = Path.Combine(folder, request.Image.FileName);

                using (var stream = new FileStream(imageFile, FileMode.Create))
                {
                    request.Image.CopyToAsync(stream);
                }
            }

            var newCategory = new Category
            {
                Name = request.Name,
                Description = request.Description,
                Image =request.Image.FileName
            };

            _db.Categories.Add(newCategory);
            _db.SaveChanges();

            return CreatedAtAction(nameof(GetcategoryById), new { id = newCategory.CategoryId }, newCategory);
        }


        [HttpPut("UpdateCategory/{id}")]
        public IActionResult UpdateCategory(int id, [FromForm] categoryRequest request)
        {
            if (id <= 0 || request == null)
            {
                return BadRequest("Invalid category data");
            }

            var category = _db.Categories.FirstOrDefault(c => c.CategoryId == id);
            if (category == null)
            {
                return NotFound("No category found for the given category ID");
            }

            

            // تحميل الصورة إذا تم توفير واحدة
            if (request.Image != null)
            {
                var folder = Path.Combine(Directory.GetCurrentDirectory(), "images");
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }
                var imageFile = Path.Combine(folder, request.Image.FileName);

                using (var stream = new FileStream(imageFile, FileMode.Create))
                {
                    if (stream != null)
                    {
                        request.Image.CopyToAsync(stream);

                    }
                }

            }

            category.Name = request.Name ?? category.Name;
            category.Description = request.Description ?? category.Description;
            category.Image = request.Image.FileName ?? category.Image;


            _db.SaveChanges();

            return NoContent();
        }

        [HttpDelete("DeleteCategory/{id}")]
        public IActionResult DeleteCategory(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid category ID");
            }

            var category = _db.Categories.FirstOrDefault(c => c.CategoryId == id);
            if (category == null)
            {
                return NotFound("No category found for the given category ID");
            }

            _db.Categories.Remove(category);
            _db.SaveChanges();

            return NoContent(); 
        }

        //Animalpage/////////////////////////////////////////////////////////////////////

        [HttpGet("GetAllAnimal")]
        public IActionResult GetAllAnimal()
        {
            var recipe = _db.Animals.ToList();
            if (recipe == null)
            {
                return NoContent();
            }
            return Ok(recipe);
        }
        [HttpGet("AnimalById/{id}")]
        public IActionResult AnimalById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid category ID");
            }
            var recipe = _db.Animals.Where(p => p.AnimalId == id).FirstOrDefault();
            if (recipe == null)
            {
                return NotFound("No category found for the given category ID");
            }
            return Ok(recipe);
        }

        [HttpPost("CreateAnimal")]
        public IActionResult CreateAnimal([FromForm] animalRequst request)
        {
            if (request == null || string.IsNullOrEmpty(request.Name))
            {
                return BadRequest("Invalid category data");
            }



            // تحميل الصورة
            if (request.Image1 != null)
            {

                var folder = Path.Combine(Directory.GetCurrentDirectory(), "images");

                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }
                var imageFile = Path.Combine(folder, request.Image1.FileName);

                using (var stream = new FileStream(imageFile, FileMode.Create))
                {
                    request.Image1.CopyToAsync(stream);
                }
            }

            var newAnemal = new Animal
            {
                Name = request.Name,
                Image1=request.Image1.FileName
            };

            _db.Animals.Add(newAnemal);
            _db.SaveChanges();

            return Ok(newAnemal);
        }


//        [HttpPut("UpdateCategory/{id}")]
//        public IActionResult UpdateCategory(int id, [FromForm] categoryRequest request)
//        {
//            if (id <= 0 || request == null)
//            {
//                return BadRequest("Invalid category data");
//            }

//            var category = _db.Categories.FirstOrDefault(c => c.CategoryId == id);
//            if (category == null)
//            {
//                return NotFound("No category found for the given category ID");
//            }



//            // تحميل الصورة إذا تم توفير واحدة
//            if (request.Image != null)
//            {
//                var folder = Path.Combine(Directory.GetCurrentDirectory(), "images");
//                if (!Directory.Exists(folder))
//                {
//                    Directory.CreateDirectory(folder);
//                }
//                var imageFile = Path.Combine(folder, request.Image.FileName);

//                using (var stream = new FileStream(imageFile, FileMode.Create))
//                {
//                    if (stream != null)
//                    {
//                        request.Image.CopyToAsync(stream);

//                    }
//                }

//            }

//            category.Name = request.Name ?? category.Name;
//            category.Description = request.Description ?? category.Description;
//            category.Image = request.Image.FileName ?? category.Image;


//            _db.SaveChanges();

//            return NoContent();
//        }

//        [HttpDelete("DeleteCategory/{id}")]
//        public IActionResult DeleteCategory(int id)
//        {
//            if (id <= 0)
//            {
//                return BadRequest("Invalid category ID");
//            }

//            var category = _db.Categories.FirstOrDefault(c => c.CategoryId == id);
//            if (category == null)
//            {
//                return NotFound("No category found for the given category ID");
//            }

//            _db.Categories.Remove(category);
//            _db.SaveChanges();

//            return NoContent();
//        }



    }
}