using System;
using System.Collections.Generic;

namespace Animal_project.Server.Models;

public partial class User
{
    public int UserId { get; set; }

    public string FullName { get; set; } = null!;

    public byte[]? PasswordHash { get; set; }

    public byte[] PasswordSalt { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Address { get; set; }

    public string? MedicalStatus { get; set; }

    public string? FlatType { get; set; }

    public string? FinancialStatus { get; set; }

    public bool? HaveKids { get; set; }

    public string? MoreDetails { get; set; }

    public bool? IsAdmin { get; set; }

    public virtual ICollection<AdoptionApplication> AdoptionApplications { get; set; } = new List<AdoptionApplication>();

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<Like> Likes { get; set; } = new List<Like>();

    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();

    public virtual ICollection<Reply> Replies { get; set; } = new List<Reply>();
}
