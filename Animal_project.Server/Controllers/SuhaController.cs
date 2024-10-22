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


        [HttpGet("GetAllPosts")]
        public IActionResult GetAllPosts()
        {
            var posts = _db.Posts
                .Include(p => p.User)
                .Select(p => new
                {
                    //PostId = p.StoryId,
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

        //=====================================
        [HttpGet("GetAllPostsbyStory/{storyId}")]
        public IActionResult GetAllPostsbyStoryId(int storyId)
        {
            var posts = _db.Posts
                .Where(p => p.StoryId == storyId) // Fetch posts for the given StoryId
                .Select(p => new
                {
                    p.StoryId,
                    p.StoryDate,
                    p.Image1,
                    p.Image2,
                    p.Flag // Return the flag from the database
                })
                .ToList();

            if (!posts.Any())
            {
                return NotFound(new { Message = "No posts found for the specified StoryId." });
            }

            return Ok(posts);
        }

        // Update flag (accept/reject) by StoryId
        [HttpPut("UpdateFlag/{storyId}")]
        public IActionResult UpdateFlag(int storyId, [FromBody] bool flag)
        {
            var post = _db.Posts.FirstOrDefault(p => p.StoryId == storyId);
            if (post == null)
            {
                return NotFound("Post not found.");
            }

            post.Flag = flag; // Update the flag based on the request
            _db.SaveChanges(); // Save changes to the database

            return Ok(post); // Return the updated post or a success message
        }
    }

}


