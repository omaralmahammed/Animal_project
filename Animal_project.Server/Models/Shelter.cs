using System;
using System.Collections.Generic;

namespace Animal_project.Server.Models;

public partial class Shelter
{
    public int ShelterId { get; set; }

    public string? ShelterName { get; set; }

    public string? Description { get; set; }

    public string? ContactEmail { get; set; }

    public string? Phone { get; set; }

    public TimeOnly? OpenTime { get; set; }

    public TimeOnly? CloseTime { get; set; }

    public string? OpenDay { get; set; }

    public string? Address { get; set; }

    public virtual ICollection<Animal> Animals { get; set; } = new List<Animal>();
}
