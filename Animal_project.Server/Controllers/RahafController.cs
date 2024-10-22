using Animal_project.Server.DTO;
using Animal_project.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Animal_project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RahafController : ControllerBase
    {

        private readonly MyDbContext _db;

        public RahafController(MyDbContext db)
        {
            _db = db;
        }


        //////////////////////////////////////////////////////////

        [HttpGet("GetAllPosts")]
        public IActionResult GetAllPosts()
        {
            var posts = _db.Posts
                .Include(p => p.User)        
                .Include(p => p.Animal)     
                .Include(p => p.Comments)   
                    .ThenInclude(c => c.User) 
                .Include(p => p.Comments)
                    .ThenInclude(c => c.Replies) 
                    .ThenInclude(r => r.User)    
                .Include(p => p.Likes)       
                    .ThenInclude(l => l.User) 
                .Select(p => new
                {
                    PostId = p.StoryId,
                    UserName = p.User.FullName,  
                    AnimalName = p.Animal != null ? p.Animal.Name : "No Animal", 
                    StoryText = p.StoryText,
                    StoryDate = p.StoryDate,
                    Image1 = p.Image1,
                    Image2 = p.Image2,
                    LikeNumber = p.Likes.Count,  
                    Likes = p.Likes.Select(l => new
                    {
                        UserName = l.User.FullName
                    }),
                    Comments = p.Comments.Select(c => new
                    {
                        c.CommentId,
                        CommentText = c.Content,
                        CommentDate = c.Post.StoryDate,
                        UserName = c.User.FullName, 
                        Replies = c.Replies.Select(r => new
                        {
                            r.ReplyId,
                            r.Content,
                            UserName = r.User.FullName 
                        })
                    })
                })
                .ToList();

            if (posts == null || !posts.Any())
            {
                return NotFound("لا توجد منشورات.");
            }

            return Ok(posts);
        }

        // GET: api/Posts/5
        [HttpGet("GetPost/{id}")]
        public IActionResult GetPost(int id)
        {
            var post = _db.Posts
                .Include(p => p.User)         
                .Include(p => p.Animal)      
                .Include(p => p.Comments)    
                    .ThenInclude(c => c.User)  
                .Include(p => p.Comments)
                    .ThenInclude(c => c.Replies) 
                    .ThenInclude(r => r.User)    
                .Include(p => p.Likes)
                    .ThenInclude(l => l.User)  
                .Where(p => p.StoryId == id)
                .Select(p => new
                {
                    PostId = p.StoryId,
                    UserName = p.User.FullName,  
                    AnimalName = p.Animal != null ? p.Animal.Name : "No Animal", 
                    StoryText = p.StoryText,
                    StoryDate = p.StoryDate,
                    Image1 = p.Image1,
                    Image2 = p.Image2,
                    LikeNumber = p.Likes.Count,  
                    Likes = p.Likes.Select(l => new
                    {
                        UserName = l.User.FullName 
                    }),
                    Comments = p.Comments.Select(c => new
                    {
                        c.CommentId,
                        CommentText = c.Content,
                        CommentDate = c.Post.StoryDate,
                        UserName = c.User.FullName, 
                        Replies = c.Replies.Select(r => new
                        {
                            r.ReplyId,
                            r.Content,
                            UserName = r.User.FullName 
                        })
                    })
                })
                .FirstOrDefault();

            if (post == null)
            {
                return NotFound("المنشور غير موجود.");
            }

            return Ok(post);
        }


        // POST: api/Posts
        [HttpPost("post")]
        public IActionResult CreatePost([FromBody] PostRequestDTO dto)
        {
            var post = new Post
            {
                UserId = dto.UserId,
                AnimalId = dto.AnimalId,
                StoryText = dto.StoryText,
                StoryDate = dto.StoryDate ?? DateTime.Now,
                Image1 = dto.Image1,
                Image2 = dto.Image2
            };

            _db.Posts.Add(post);
            _db.SaveChanges(); // Ensure changes are saved to the database
            return CreatedAtAction(nameof(GetPost), new { id = post.StoryId }, post);
        }

        // PUT: api/Posts/5
        [HttpPut("UpdatePost")]
        public IActionResult UpdatePost(int id, [FromBody] PostRequestDTO dto)
        {
            var post = _db.Posts.FirstOrDefault(p => p.StoryId == id);
            if (post == null)
            {
                return NotFound("المنشور غير موجود.");
            }

            post.StoryText = dto.StoryText ?? post.StoryText;
            post.StoryDate = dto.StoryDate ?? post.StoryDate;
            post.Image1 = dto.Image1 ?? post.Image1;
            post.Image2 = dto.Image2 ?? post.Image2;

            _db.SaveChanges(); // Ensure changes are saved to the database
            return NoContent();
        }

        // DELETE: api/Posts/5
        [HttpDelete("DeletePost")]
        public IActionResult DeletePost(int id)
        {
            var post = _db.Posts.FirstOrDefault(p => p.StoryId == id);
            if (post == null)
            {
                return NotFound("المنشور غير موجود.");
            }

            _db.Posts.Remove(post);
            _db.SaveChanges(); // Ensure changes are saved to the database
            return NoContent();
        }
        //////////////////////////////////////////////////////////////////////
        // GET: api/Comments/GetAllComments
        [HttpGet("GetAllComments")]
        public IActionResult GetAllComments()
        {
            var comments = _db.Comments.Include(c => c.User).Include(c => c.Post).ToList();
            if (comments == null || !comments.Any())
            {
                return NotFound("لا توجد تعليقات.");
            }
            return Ok(comments);
        }

        // GET: api/Comments/5
        [HttpGet("GetComment")]
        public IActionResult GetComment(int id)
        {
            var comment = _db.Comments.Include(c => c.User).Include(c => c.Post)
                          .FirstOrDefault(c => c.CommentId == id);
            if (comment == null)
            {
                return NotFound("التعليق غير موجود.");
            }
            return Ok(comment);
        }

        // POST: api/Comments
        [HttpPost("CreateComment")]
        public IActionResult CreateComment([FromBody] CommentRequestDTO dto)
        {
            var comment = new Comment
            {
                PostId = dto.PostId,
                UserId = dto.UserId,
                Content = dto.Content
            };

            _db.Comments.Add(comment);
            _db.SaveChanges(); // Save changes to the database
            return CreatedAtAction(nameof(GetComment), new { id = comment.CommentId }, comment);
        }

        // PUT: api/Comments/5
        [HttpPut("UpdateComment")]
        public IActionResult UpdateComment(int id, [FromBody] CommentRequestDTO dto)
        {
            var comment = _db.Comments.FirstOrDefault(c => c.CommentId == id);
            if (comment == null)
            {
                return NotFound("التعليق غير موجود.");
            }

            comment.Content = dto.Content ?? comment.Content;

            _db.SaveChanges(); // Save changes to the database
            return NoContent();
        }

        // DELETE: api/Comments/5
        [HttpDelete("DeleteComment")]
        public IActionResult DeleteComment(int id)
        {
            var comment = _db.Comments.FirstOrDefault(c => c.CommentId == id);
            if (comment == null)
            {
                return NotFound("التعليق غير موجود.");
            }

            _db.Comments.Remove(comment);
            _db.SaveChanges(); // Save changes to the database
            return NoContent();
        }
        /////////////////////////////////////////////////////////////////


        // GET: api/Replies/GetAllReplies
        [HttpGet("GetAllReplies")]
        public IActionResult GetAllReplies()
        {
            var replies = _db.Replies.Include(r => r.User).Include(r => r.Comment).ToList();
            if (replies == null || !replies.Any())
            {
                return NotFound("لا توجد ردود.");
            }
            return Ok(replies);
        }

        // GET: api/Replies/5
        [HttpGet("GetReply")]
        public IActionResult GetReply(int id)
        {
            var reply = _db.Replies.Include(r => r.User).Include(r => r.Comment)
                          .FirstOrDefault(r => r.ReplyId == id);
            if (reply == null)
            {
                return NotFound("الرد غير موجود.");
            }
            return Ok(reply);
        }

        // POST: api/Replies
        [HttpPost("CreateReply")]
        public IActionResult CreateReply([FromBody] ReplyRequestDTO dto)
        {
            var reply = new Reply
            {
                CommentId = dto.CommentId,
                UserId = dto.UserId,
                Content = dto.Content
            };

            _db.Replies.Add(reply);
            _db.SaveChanges(); // Save changes to the database
            return CreatedAtAction(nameof(GetReply), new { id = reply.ReplyId }, reply);
        }

        // PUT: api/Replies/5
        [HttpPut("UpdateReply")]
        public IActionResult UpdateReply(int id, [FromBody] ReplyRequestDTO dto)
        {
            var reply = _db.Replies.FirstOrDefault(r => r.ReplyId == id);
            if (reply == null)
            {
                return NotFound("الرد غير موجود.");
            }

            reply.Content = dto.Content ?? reply.Content;

            _db.SaveChanges(); // Save changes to the database
            return NoContent();
        }

        // DELETE: api/Replies/5
        [HttpDelete("DeleteReply")]
        public IActionResult DeleteReply(int id)
        {
            var reply = _db.Replies.FirstOrDefault(r => r.ReplyId == id);
            if (reply == null)
            {
                return NotFound("الرد غير موجود.");
            }

            _db.Replies.Remove(reply);
            _db.SaveChanges(); // Save changes to the database
            return NoContent();
        }
        [HttpGet("getImages/{imageName}")]
        public IActionResult getImage(string imageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "images", imageName);

            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/*");
            }

            return NotFound();

        }
    }
}
