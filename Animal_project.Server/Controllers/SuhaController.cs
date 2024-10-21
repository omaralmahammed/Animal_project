using Animal_project.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Animal_project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuhaController : ControllerBase
    {
        public class ProfileController : ControllerBase
        {
            private readonly MyDbContext _db;

            public ProfileController(MyDbContext db)
            {
                _db = db;
            }
            [HttpGet("GetAllPosts")]
            public IActionResult GetAllPosts()
            {
                var posts = _db.Posts.ToList();
                if (posts == null || !posts.Any())
                {
                    return NotFound("There's No Posts");
                }
                return Ok(posts);
            }

            // GET: api/Posts
            [HttpGet("GetAllPostsbyStory{id}")]
            public IActionResult GetPost(int id)
            {
                var post = _db.Posts.FirstOrDefault(p => p.StoryId == id);
                if (post == null)
                {
                    return NotFound("Post not there");
                }
                return Ok(post);
            }
        }

    }
}


