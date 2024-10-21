namespace Animal_project.Server.DTO
{
    public class shelterRequest
    {

        public string? ShelterName { get; set; }

        public string? Description { get; set; }

        public string? ContactEmail { get; set; }

        public string? Phone { get; set; }

        public TimeOnly? OpenTime { get; set; }

        public TimeOnly? CloseTime { get; set; }

        public string? OpenDay { get; set; }

        public string? Address { get; set; }
    }
}
