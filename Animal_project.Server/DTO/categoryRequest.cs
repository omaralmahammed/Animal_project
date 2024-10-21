namespace Animal_project.Server.DTO
{
    public class categoryRequest
    {
        public string? Name { get; set; }

        public string? Description { get; set; }

        public IFormFile? Image { get; set; }
    }
}
