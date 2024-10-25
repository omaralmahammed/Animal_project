import { Component } from '@angular/core';
import { RaneemService } from '../../Raneem/raneem.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updat-animal-admin',
  templateUrl: './updat-animal-admin.component.html',
  styleUrl: './updat-animal-admin.component.css'
})
export class UpdatAnimalAdminComponent {

  param: any;
  imageFile: any;
  DetailsArray: any = {};
  CategoryArray: any[] = [];
  shelterArray: any[] = [];

  constructor(private _ser: RaneemService, private _active: ActivatedRoute, private _src: RaneemService) {
    this.param = this._active.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getAnimalbyID(this.param);
    this.GetCategory();
    this.Getshelters();

  }

  changeimageevevnt(event: any) {
    this.imageFile = event.target.files[0];
  }

  UpdateAnimalAdmin(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }
    form.append("Image1", this.imageFile);

    this._ser.UpdateAnimal(this.param, form).subscribe(() => {
      alert("animal Updated Successfully");
    });
  }

  getAnimalbyID(id: any) {
    this._ser.getAnimalDetails(id).subscribe((data) => {
      this.DetailsArray = data;
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

