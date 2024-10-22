import { Component, OnInit  } from '@angular/core';
import { RaneemService } from '../../Raneem/raneem.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updat-ctegory-admin',
  templateUrl: './updat-ctegory-admin.component.html',
  styleUrl: './updat-ctegory-admin.component.css'
})
export class UpdatCtegoryAdminComponent implements OnInit {
  ngOnInit() {
    this.getCategoryBYid(this.param);

  }
  param: any
  imageFile: any
  DetailsArray: any = {};
  changeimageevevnt(event: any) {
    this.imageFile = event.target.files[0]
  }
  constructor(private _ser: RaneemService, private _active: ActivatedRoute) {
    this.param = this._active.snapshot.paramMap.get('id');

  }


  UpdateCategoryId(data: any) {
debugger
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }
    form.append("image", this.imageFile)
    this._ser.Updatecategory(this.param, form).subscribe((data) => {
      alert("category Updated Successfully")
    })
  }

  getCategoryBYid(id: any) {
    this._ser.getCategorybyID(id).subscribe((data) => {
      this.DetailsArray = data;
    });
  }
}

