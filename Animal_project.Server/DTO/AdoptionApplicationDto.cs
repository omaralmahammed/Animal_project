namespace Animal_project.Server.DTO
{
    public class AdoptionApplicationDto
    {
        public int ApplicationId { get; set; }
        public int? UserId { get; set; }
        public int? AnimalId { get; set; }
        public DateTime? ApplicationDate { get; set; }
        public string? Status { get; set; }
        public bool? IsReceived { get; set; }
    }
}
