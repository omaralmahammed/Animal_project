namespace Animal_project.Server.DTO
{
    public class UserInformationRequestDTO
    {
        public string? FullName { get; set; } = null!;
        public string? Password { get; set; } = null!;
        public string? Email { get; set; } = null!;
        public string? Address { get; set; }
        public string? MedicalStatus { get; set; }
        public string? FlatType { get; set; }
        public string? FinancialStatus { get; set; }
        public bool? HaveKids { get; set; }
        public string? MoreDetails { get; set; }
    }
}
