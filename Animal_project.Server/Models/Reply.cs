using System;
using System.Collections.Generic;

namespace Animal_project.Server.Models;

public partial class Reply
{
    public int ReplyId { get; set; }

    public int CommentId { get; set; }

    public int UserId { get; set; }

    public string? Content { get; set; }

    public virtual Comment Comment { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
