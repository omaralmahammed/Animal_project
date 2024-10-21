using Animal_project.Server.DTO;
using Animal_project.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

            var newCategory = new Category
            {
                Name = request.Name,
                Description = request.Description
            };

            // تحميل الصورة
            if (request.Image != null)
            {
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", request.Image.FileName);
                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    request.Image.CopyTo(stream);
                }
                newCategory.Image = Path.Combine("/images", request.Image.FileName);
            }

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

            category.Name = request.Name;
            category.Description = request.Description;

            // تحميل الصورة إذا تم توفير واحدة
            if (request.Image != null)
            {
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", request.Image.FileName);
                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    request.Image.CopyTo(stream);
                }
                category.Image = Path.Combine("images", request.Image.FileName);
            }

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

    
    }
}