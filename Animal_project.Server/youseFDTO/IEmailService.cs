using MimeKit;
using MailKit.Net.Smtp;
namespace Animal_project.Server.youseFDTO
{
    public interface IEmailService
    {

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IEmailService, EmailService>();
            services.AddControllers();
            // other services
        }

        Task SendEmailAsync(string? Email, string userEmailSubject, string userEmailBody);
    }
}
