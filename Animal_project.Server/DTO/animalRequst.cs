namespace Animal_project.Server.DTO
{
    public class animalRequst
    {
        

        public string? Name { get; set; } 

        public string? Species { get; set; }

        public string? Breed { get; set; }

        public int? Age { get; set; }

        public string? Size { get; set; }

        public string? Temperament { get; set; }

        public string? SpecialNeeds { get; set; }

        public string? Description { get; set; }

        public string? AdoptionStatus { get; set; }

        //public string? Vaccination1 { get; set; }

        //public string? Vaccination2 { get; set; }

        //public string? Vaccination3 { get; set; }

        public IFormFile? Image1 { get; set; }

        //public string? Image2 { get; set; }

        public int? ShelterId { get; set; }

        public int? CategoryId { get; set; }


    }
}
