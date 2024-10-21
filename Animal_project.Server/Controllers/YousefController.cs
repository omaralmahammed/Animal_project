﻿using Animal_project.Server.Models;
using Animal_project.Server.youseFDTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Animal_project.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YousefController : ControllerBase
    {
        private readonly MyDbContext _db;
        //private readonly IEmailService _emailService;

        public YousefController(MyDbContext db/*, IEmailService emailService*/)
        {
            _db = db;
            //_emailService = emailService;
        }

        [HttpGet("GetAllMessage")]
        public IActionResult GetAllMessage()
        {
            var GetAllMessage = _db.Comments.ToList();

            return Ok(GetAllMessage);
        }

        ///////////////////////////////////////////////////////////////////////

        [HttpGet("GetMessage/{id}")]
        public IActionResult GetMessage(int id)
        {
            var message = _db.ContactUs.FirstOrDefault(m => m.ContactId == id);

            if (message == null)
            {
                return NotFound(new { Message = "Message not found" });
            }

            var messageDto = new ContactU
            {
              Email = message.Email,
              Subject = message.Subject
            };

            return Ok(message);
        }

        ///////////////////////////////////////////////////////////////
        ///
        [HttpPost("PostMessage")]
        public IActionResult PostMessage([FromForm] ContactUsDto contactUsDto)
        {


            var contact = new ContactU
            {
                Name = contactUsDto.Name,
                Email = contactUsDto.Email,
                Message = contactUsDto.Message,
                Subject = contactUsDto.Subject,
                //SentDate = DateTime.Now,

            };

            _db.ContactUs.Add(contact);
            _db.SaveChanges();

            return Ok(new { Message = "Contact message sent successfully!" });
        }


        /// ////////////////////////////////////////////////////
        /// 

        //[HttpPost("PostMessageToEmail")]
        //public async Task<IActionResult> PostMessageToEmail([FromForm] ContactUsDto contactUsDto)
        //{
        //    var contact = new ContactU
        //    {
        //        Message = contactUsDto.Message,
        //        Subject = contactUsDto.Subject,
        //        Email = contactUsDto.Email,
        //    };

        //    _db.ContactUs.Add(contact);
        //    await _db.SaveChangesAsync();

        //    var subject = contactUsDto.Subject;
        //    var messageBody = $"You have received a new message from {contactUsDto.Name} ({contactUsDto.Email}):<br><br>{contactUsDto.MessageContent}";

        //    try
        //    {
        //        // Send email to admin
        //        await _emailService.SendEmailAsync("admin@example.com", subject, messageBody);

        //        // Send email to the user
        //        var userEmailSubject = "Thank you for contacting us!";
        //        var userEmailBody = $"Dear {contactUsDto.Name},<br><br>Thank you for reaching out. We have received your message:<br><br>{contactUsDto.MessageContent}<br><br>We will get back to you shortly.";
        //        await _emailService.SendEmailAsync(contactUsDto.Email, userEmailSubject, userEmailBody);

        //        return Ok(new { Message = "Contact message sent successfully and emails delivered!" });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { Message = $"Message saved, but failed to send email: {ex.Message}" });
        //    }
        //}

    }
}
