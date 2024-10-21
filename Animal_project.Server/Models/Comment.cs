using System;
using System.Collections.Generic;

namespace Animal_project.Server.Models;

public partial class Comment
{
    public int CommentId { get; set; }

    public int PostId { get; set; }

    public int UserId { get; set; }

    public string? Content { get; set; }

    public virtual Post Post { get; set; } = null!;

    public virtual ICollection<Reply> Replies { get; set; } = new List<Reply>();

    public virtual User User { get; set; } = null!;
}
