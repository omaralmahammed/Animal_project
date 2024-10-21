namespace Animal_project.Server.DTO
{
    public class UserInformationRequestDTO
    {
        public string? FullName { get; set; } = null!;
        public string Password { get; set; } = null!;
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; } = null!;
        public string Email { get; set; } = null!;
        public bool? IsAdmin { get; set; }

    }
}
