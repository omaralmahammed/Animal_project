using Animal_project.Server.Models;

namespace Animal_project.Server.DTO
{
    public class CommentRequestDTO
    {


        public int PostId { get; set; }

        public int UserId { get; set; }

        public string? Content { get; set; }

    }
}
