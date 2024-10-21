using System;
using System.Collections.Generic;

namespace Animal_project.Server.Models;

public partial class Category
{
    public int CategoryId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public byte[]? Image { get; set; }

    public virtual ICollection<Animal> Animals { get; set; } = new List<Animal>();
}
