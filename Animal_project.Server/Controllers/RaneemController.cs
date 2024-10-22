using Animal_project.Server.DTO;
using Animal_project.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Drawing;
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

                if (!System.IO.File.Exists(imageFile))
                {
                    using (var stream = new FileStream(imageFile, FileMode.Create))
                    {
                        request.Image.CopyToAsync(stream);
                    }
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

                // تحقق من وجود الفولدر، وإنشاءه إذا كان غير موجود
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                var imageFile = Path.Combine(folder, request.Image.FileName);

                if (!System.IO.File.Exists(imageFile))
                {
                    using (var stream = new FileStream(imageFile, FileMode.Create))
                    {
                        request.Image.CopyToAsync(stream);
                    }
                }
                // تحديث الحقل Image1
                category.Image = request.Image.FileName ?? category.Image;
            }

            category.Name = request.Name ?? category.Name;
            category.Description = request.Description ?? category.Description;
            //category.Image = request.Image.FileName ?? category.Image;


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
            var recipe = _db.Animals.Where(p => p.AnimalId == id).Select(a => new
            {
                AnimalId = a.AnimalId,
                Name = a.Name,
                Species = a.Species,
                Breed = a.Breed,
                Age = a.Age,
                Size = a.Size,
                Temperament = a.Temperament,
                SpecialNeeds = a.SpecialNeeds,
                Description = a.Description,
                AdoptionStatus = a.AdoptionStatus,
                Image1 = a.Image1,
                ShelterDetails = new
                {
                    ShelterId = a.Shelter.ShelterId,
                    ShelterName = a.Shelter.ShelterName,
                    ShelterDescription = a.Shelter.Description,
                    ContactEmail = a.Shelter.ContactEmail,
                    Phone = a.Shelter.Phone,
                    OpenTime = a.Shelter.OpenTime,
                    CloseTime = a.Shelter.CloseTime,
                    OpenDay = a.Shelter.OpenDay,
                    Address = a.Shelter.Address
                }
            }).FirstOrDefault();
            if (recipe == null)
            {
                return NotFound("No category found for the given category ID");
            }
            return Ok(recipe);
        }


        [HttpGet("GetAnimalsByCategoryId/{categoryId}")]
        public IActionResult AnimalsByCategoryId(int categoryId)
        {
            if (categoryId <= 0)
            {
                return BadRequest("Invalid category ID");
            }

            var animals = _db.Animals.Where(a => a.CategoryId == categoryId).ToList();

            if (animals == null || !animals.Any())
            {
                return NotFound("No animals found for the given category ID");
            }

            return Ok(animals);
        }


        [HttpPost("CreateAnimal")]
        public IActionResult CreateAnimal([FromForm] animalRequst request)
        {
            if (request == null || string.IsNullOrEmpty(request.Name))
            {
                return BadRequest("Invalid category data");
            }



            if (request.Image1 != null)
            {

                var folder = Path.Combine(Directory.GetCurrentDirectory(), "images");

                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }
                var imageFile = Path.Combine(folder, request.Image1.FileName);
                if (!System.IO.File.Exists(imageFile))
                {
                    using (var stream = new FileStream(imageFile, FileMode.Create))
                    {
                        request.Image1.CopyToAsync(stream);
                    }
                }
            }

            var newAnemal = new Animal
            {
                Name = request.Name,
                Description=request.Description,
                Species=request.Species,
                Breed=request.Breed,
                Age=request.Age,
                Size=request.Size,
                Temperament=request.Temperament,
                SpecialNeeds=request.SpecialNeeds,
                AdoptionStatus=request.AdoptionStatus,
                ShelterId = request.ShelterId,
                CategoryId = request.CategoryId,    
                Image1=request.Image1.FileName,

            };

            _db.Animals.Add(newAnemal);
            _db.SaveChanges();

            return Ok(newAnemal);
        }


        [HttpPut("UpdateAnimal/{id}")]
        public IActionResult UpdateAnimal(int id, [FromForm] animalRequst request)
        {
            if (id <= 0 || request == null)
            {
                return BadRequest("Invalid Animal data");
            }

            var Animal = _db.Animals.FirstOrDefault(c => c.AnimalId == id);
            if (Animal == null)
            {
                return NotFound("No Animal found for the given Animal ID");
            }



            if (request.Image1 != null)
            {
                var folder = Path.Combine(Directory.GetCurrentDirectory(), "images");

                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                var imageFile = Path.Combine(folder, request.Image1.FileName);

                if (!System.IO.File.Exists(imageFile))
                {
                    using (var stream = new FileStream(imageFile, FileMode.Create))
                    {
                        request.Image1.CopyToAsync(stream);
                    }
                }

                Animal.Image1 = request.Image1.FileName ??Animal.Image1;
            }

            Animal.Name = request.Name ?? Animal.Name;
            Animal.Description = request.Description ?? Animal.Description;
            Animal.Species = request.Species ?? Animal.Species;
            Animal.Breed = request.Breed ?? Animal.Breed;
            Animal.Age = request.Age ?? Animal.Age;
            Animal.Size = request.Size ?? Animal.Size;
            Animal.Temperament = request.Temperament ?? Animal.Temperament;
            Animal.SpecialNeeds = request.SpecialNeeds ?? Animal.SpecialNeeds;
            Animal.AdoptionStatus = request.AdoptionStatus ?? Animal.AdoptionStatus;
            //Animal.Image1 = request.Image1.FileName ?? Animal.Image1;
            Animal.ShelterId = request.ShelterId ?? Animal.ShelterId;
            Animal.CategoryId = request.CategoryId ?? Animal.CategoryId;


            _db.SaveChanges();

            return NoContent();
        }

        [HttpDelete("DeleteAnimal/{id}")]
        public IActionResult DeleteAnimal(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid Animal ID");
            }

            var Animall = _db.Animals.FirstOrDefault(c => c.AnimalId == id);
            if (Animall == null)
            {
                return NotFound("No Animal found for the given Animal ID");
            }

            _db.Animals.Remove(Animall);
            _db.SaveChanges();

            return NoContent();
        }


        ////shelter/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        [HttpGet("Shelters")]
        public IActionResult GetAllShelters()
        {
            var shelters = _db.Shelters.ToList();
            return Ok(shelters);
        }



        [HttpGet("ShelterById/{id}")]
        public IActionResult GetShelterById(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid shelter ID");
            }

            var shelter = _db.Shelters.FirstOrDefault(s => s.ShelterId == id);
            if (shelter == null)
            {
                return NotFound("No shelter found for the given ID");
            }

            return Ok(shelter);
        }

        [HttpPost("CreateShelter")]
        public IActionResult CreateShelter([FromForm] shelterRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.ShelterName))
            {
                return BadRequest("Invalid shelter data");
            }

            var newShelter = new Shelter
            {
                ShelterName = request.ShelterName,
                Description = request.Description,
                ContactEmail = request.ContactEmail,
                Phone = request.Phone,
                OpenTime = request.OpenTime,
                CloseTime = request.CloseTime,
                OpenDay = request.OpenDay,
                Address = request.Address,
        };

            _db.Shelters.Add(newShelter);
            _db.SaveChanges();

            return CreatedAtAction(nameof(GetShelterById), new { id = newShelter.ShelterId }, newShelter);
        }

        [HttpPut("UpdateShelter/{id}")]
        public IActionResult UpdateShelter(int id, [FromForm] shelterRequest request)
        {
            if (id <= 0 || request == null)
            {
                return BadRequest("Invalid shelter data");
            }

            var shelter = _db.Shelters.FirstOrDefault(s => s.ShelterId == id);
            if (shelter == null)
            {
                return NotFound("No shelter found for the given ID");
            }

            shelter.ShelterName = request.ShelterName ?? shelter.ShelterName;
            shelter.Description = request.Description ?? shelter.Description;
            shelter.ContactEmail = request.ContactEmail ?? shelter.ContactEmail;
            shelter.Phone = request.Phone ?? shelter.Phone;
            shelter.OpenTime = request.OpenTime ?? shelter.OpenTime;
            shelter.CloseTime = request.CloseTime ?? shelter.CloseTime;
            shelter.OpenDay = request.OpenDay ?? shelter.OpenDay;
            shelter.Address = request.Address ?? shelter.Address;

            _db.SaveChanges();

            return NoContent();
        }
        [HttpDelete("DeleteShelter/{id}")]
        public IActionResult DeleteShelter(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid shelter ID");
            }

            var shelter = _db.Shelters.FirstOrDefault(s => s.ShelterId == id);
            if (shelter == null)
            {
                return NotFound("No shelter found for the given ID");
            }

            _db.Shelters.Remove(shelter);
            _db.SaveChanges();

            return NoContent();
        }
    }
}