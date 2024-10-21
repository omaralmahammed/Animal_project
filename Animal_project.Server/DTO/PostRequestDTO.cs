using Animal_project.Server.Models;

namespace Animal_project.Server.DTO
{
    public class PostRequestDTO
    {

        public int UserId { get; set; }

        public int? AnimalId { get; set; }

        public string? StoryText { get; set; }

        public DateTime? StoryDate { get; set; }

        public string? Image1 { get; set; }

        public string? Image2 { get; set; }

    }
}
