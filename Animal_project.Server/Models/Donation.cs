using System;
using System.Collections.Generic;

namespace Animal_project.Server.Models;

public partial class Donation
{
    public int DonationId { get; set; }

    public decimal? Amount { get; set; }

    public int? AnimalId { get; set; }

    public decimal? RequiredAmount { get; set; }

    public bool? IsCompleted { get; set; }

    public virtual Animal? Animal { get; set; }
}
