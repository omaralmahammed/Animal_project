import { Component } from '@angular/core';
import { RaneemService } from '../../Raneem/raneem.service';

@Component({
  selector: 'app-add-shelter-admin',
  templateUrl: './add-shelter-admin.component.html',
  styleUrl: './add-shelter-admin.component.css'
})
export class AddShelterAdminComponent {
  

  constructor(private _src: RaneemService) { }

  ngOnInit() {
   
  }


  AddNewShelter(data: any) {
    debugger
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }
    this._src.AddShelter(form).subscribe(() => {
      alert("added ");
    });
  }

  

 
}
