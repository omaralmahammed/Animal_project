using System;
using System.Collections.Generic;

namespace Animal_project.Server.Models;

public partial class AdoptionApplication
{
    public int ApplicationId { get; set; }

    public int? UserId { get; set; }

    public int? AnimalId { get; set; }

    public DateTime? ApplicationDate { get; set; }

    public string? Status { get; set; }

    public bool? IsReceived { get; set; }

    public virtual Animal? Animal { get; set; }

    public virtual User? User { get; set; }
}
