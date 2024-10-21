namespace Animal_project.Server.DTO
{
    public class ReplyRequestDTO
    {
        public int CommentId { get; set; }

        public int UserId { get; set; }

        public string? Content { get; set; }
    }
}
