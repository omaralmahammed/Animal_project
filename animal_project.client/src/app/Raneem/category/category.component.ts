import { Component } from '@angular/core';
import { RaneemService } from '../raneem.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  ngOnInit() {
    this.GetCategory()
  }
  constructor(private _ser:
    RaneemService) { }

  CategoryAraay: any
  GetCategory() {

    this._ser.GetAllCategory().subscribe((data) => {
      this.CategoryAraay = data
      console.log(this.CategoryAraay)

    })
  }
}
