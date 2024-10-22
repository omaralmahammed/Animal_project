using Animal_project.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Animal_project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuhaController : ControllerBase
    {
        private readonly MyDbContext _db;

        public SuhaController(MyDbContext db)
        {
            _db = db;
        }

            //[HttpGet("GetAllPosts")]
            //public IActionResult GetAllPosts()
            //{
            //    var posts = _db.Posts.ToList();
            //    if (posts == null || !posts.Any())
            //    {
            //        return NotFound("There's No Posts");
            //    }
            //    return Ok(posts);
            //}
        [HttpGet("GetAllPosts")]
        public IActionResult GetAllPosts()
        {
            var posts = _db.Posts
                .Include(p => p.User)
                .Select(p => new
                {
                    PostId = p.StoryId,
                    UserName = p.User.FullName,
                    StoryText = p.StoryText,
                    StoryDate = p.StoryDate,
                    Image1 = p.Image1,
                    Image2 = p.Image2
                })
                .ToList();

            if (posts == null || !posts.Any())
            {
                return NotFound("No posts found.");
            }

            return Ok(posts);
        }


        // GET: api/Posts
        //[HttpGet("GetAllPostsbyStory{id}")]
        //    public IActionResult GetPost(int id)
        //    {
        //        var post = _db.Posts.FirstOrDefault(p => p.StoryId == id);
        //        if (post == null)
        //        {
        //            return NotFound("Post not there");
        //        }
        //        return Ok(post);
        //    }
        [HttpGet("GetAllPostsbyStory{id}")]
        public IActionResult GetPostsByStoryId(int id)
        {
            var posts = _db.Posts.Where(p => p.StoryId == id).ToList(); // Get all posts for a specific StoryId
            if (posts == null || !posts.Any())
            {
                return NotFound("No posts found for this Story ID");
            }
            return Ok(posts); // Return the list of posts
        }

    }

}



