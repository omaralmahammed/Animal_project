import { Component } from '@angular/core';
import { RaneemService } from '../../Raneem/raneem.service';

@Component({
  selector: 'app-get-category-admin',
  templateUrl: './get-category-admin.component.html',
  styleUrl: './get-category-admin.component.css'
})
export class GetCategoryAdminComponent {

  searchTerm: string = '';
  categoryArray: any[] = [];
  filteredRecipeArray: any[] = [];
  constructor(private _ser: RaneemService) { }

  ngOnInit() {
    this.Getcategory();
  }

  Getcategory() {
    this._ser.GetAllCategory().subscribe((data) => {
      this.categoryArray = data;
      //this.filteredRecipeArray = this.RecipeArray;
      console.log("All Recipes: ", this.categoryArray);
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

  deletCategoryId(id: any) {
    this._ser.deletCategory(id).subscribe(() => {
      alert("category deleted successfully");
      this.Getcategory();
    });
  }
}
