import { Component } from '@angular/core';
import { RaneemService } from '../../Raneem/raneem.service';

@Component({
  selector: 'app-get-shelter-admin',
  templateUrl: './get-shelter-admin.component.html',
  styleUrl: './get-shelter-admin.component.css'
})
export class GetShelterAdminComponent {

  searchTerm: string = '';
  shelterArray: any[] = [];
  filteredRecipeArray: any[] = [];
  constructor(private _ser: RaneemService) { }

  ngOnInit() {
    this.GetallShelter();
  }

  GetallShelter() {
    this._ser.GetShelter().subscribe((data) => {
      this.shelterArray = data;
      //this.filteredRecipeArray = this.RecipeArray;
      console.log("All shelter: ", this.shelterArray);
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

  deletshelterId(id: any) {
    this._ser.deletShelter(id).subscribe(() => {
      alert("shelter deleted successfully");
      this.GetallShelter();
    });
  }
}
