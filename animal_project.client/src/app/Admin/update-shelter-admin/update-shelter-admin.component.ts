import { Component } from '@angular/core';
import { RaneemService } from '../../Raneem/raneem.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-shelter-admin',
  templateUrl: './update-shelter-admin.component.html',
  styleUrl: './update-shelter-admin.component.css'
})
export class UpdateShelterAdminComponent {

  param: any;
  DetailsArray: any = {};
 

  constructor(private _ser: RaneemService, private _active: ActivatedRoute, private _src: RaneemService) {
    this.param = this._active.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getShelterbyID(this.param);
   
  }

  UpdateShelterlAdmin(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }
    this._ser.UpdateShelter(this.param, form).subscribe(() => {
      alert("Shelter updated successfully");
    });
  }


  getShelterbyID(id: any) {
    this._ser.getShelterById(id).subscribe((data) => {
      this.DetailsArray = data;
    });
  }

 
}

