using Animal_project.Server.Models;

namespace Animal_project.Server.DTO
{
    public class PostRequestDTO
    {

        public int UserId { get; set; }

        public int? AnimalId { get; set; }

        public string? StoryText { get; set; }

        public DateTime? StoryDate { get; set; }

        public IFormFile? Image1 { get; set; }

        public IFormFile? Image2 { get; set; }
        public bool? Flag { get; set; }

    }
}
