import { Component, OnInit } from '@angular/core';
import { RaneemService } from '../../Raneem/raneem.service';

@Component({
  selector: 'app-add-animal-admin',
  templateUrl: './add-animal-admin.component.html',
  styleUrl: './add-animal-admin.component.css'
})
export class AddAnimalAdminComponent implements OnInit {
  shelterArray: any[] = [];
  CategoryArray: any[] = [];
  image: any;

  constructor(private _src: RaneemService) { }

  ngOnInit() {
    this.GetCategory();
    this.Getshelters();
  }

  changeImage(event: any) {
    this.image = event.target.files[0];
  }

  AddNewAnimal(data: any) {
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }
    form.append("image1", this.image);
    this._src.AddAnimal(form).subscribe(() => {
      alert("added ")
    });
  }

  GetCategory() {
    this._src.GetAllCategory().subscribe((data) => {
      this.CategoryArray = data;
      console.log("All category: ", this.CategoryArray);
    });
  }

  Getshelters() {
    this._src.GetShelter().subscribe((data) => {
      this.shelterArray = data;
      console.log("All shelter: ", this.shelterArray);
    });
  }
}
