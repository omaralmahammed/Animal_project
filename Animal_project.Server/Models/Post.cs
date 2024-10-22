using System;
using System.Collections.Generic;

namespace Animal_project.Server.Models;

public partial class Post
{
    public int StoryId { get; set; }

    public int UserId { get; set; }

    public int? AnimalId { get; set; }

    public string? StoryText { get; set; }

    public DateTime? StoryDate { get; set; }

    public string? Image1 { get; set; }

    public string? Image2 { get; set; }

    public int? LikeNumber { get; set; }

    public virtual Animal? Animal { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<Like> Likes { get; set; } = new List<Like>();

    public virtual User User { get; set; } = null!;
}
