import { Component } from '@angular/core';
import { RaneemService } from '../../Raneem/raneem.service';

@Component({
  selector: 'app-get-animal-admin',
  templateUrl: './get-animal-admin.component.html',
  styleUrl: './get-animal-admin.component.css'
})
export class GetAnimalAdminComponent {

  searchTerm: string = '';
  AnimalArray: any[] = [];
  filteredRecipeArray: any[] = [];
  constructor(private _ser: RaneemService) { }

  ngOnInit() {
    this.GetAlllAnimal();
  }

  GetAlllAnimal() {
    this._ser.Getanimal().subscribe((data) => {
      this.AnimalArray = data;
      //this.filteredRecipeArray = this.RecipeArray;
      console.log("All animal: ", this.AnimalArray);
    });
  }

  //filterRecipes() {
  //  console.log("Search Term: ", this.searchTerm);
  //  if (!this.searchTerm) {
  //    this.filteredRecipeArray = this.RecipeArray;
  //  } else {
  //    this.filteredRecipeArray = this.RecipeArray.filter(recipe =>
  //      recipe.recipeName.toLowerCase().includes(this.searchTerm.toLowerCase())
  //    );
  //    console.log("Filtered Recipes: ", this.filteredRecipeArray);
  //  }
  //}

  deletAnimalId(id: any) {
    this._ser.deletAnimal(id).subscribe(() => {
      alert("Animal deleted successfully");
      this.GetAlllAnimal();
    });
  }
}
