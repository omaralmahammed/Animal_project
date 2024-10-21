using System;
using System.Collections.Generic;

namespace Animal_project.Server.Models;

public partial class Animal
{
    public int AnimalId { get; set; }

    public string Name { get; set; } = null!;

    public string Species { get; set; } = null!;

    public string? Breed { get; set; }

    public int? Age { get; set; }

    public string? Size { get; set; }

    public string? Temperament { get; set; }

    public string? SpecialNeeds { get; set; }

    public string? Description { get; set; }

    public string? AdoptionStatus { get; set; }

    public string? Vaccination1 { get; set; }

    public string? Vaccination2 { get; set; }

    public string? Vaccination3 { get; set; }

    public string? Image1 { get; set; }

    public string? Image2 { get; set; }

    public int? ShelterId { get; set; }

    public int? CategoryId { get; set; }

    public virtual ICollection<AdoptionApplication> AdoptionApplications { get; set; } = new List<AdoptionApplication>();

    public virtual Category? Category { get; set; }

    public virtual ICollection<Donation> Donations { get; set; } = new List<Donation>();

    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();

    public virtual Shelter? Shelter { get; set; }
}
