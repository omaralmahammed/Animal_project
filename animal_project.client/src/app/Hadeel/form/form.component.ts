import { Component, OnInit } from '@angular/core';
import { HadeelService } from '../hadeel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  animalId: any;
  userId = localStorage.getItem("UserId")
  UserInfo: any = {};
  AnimalArray : any
 
  constructor(private _ser: HadeelService,private _rout: ActivatedRoute, private _router: Router) { }



  ngOnInit() {
    this.animalId = this._rout.snapshot.paramMap.get('id');
    this.GetAnimal(this.animalId)
  }

  GetAnimal(id: any) {
    this._ser.GetDAnimal(id).subscribe((data) => {
      this.AnimalArray = data;  
      console.log(this.AnimalArray);
    }, (error) => {
      console.error('Error fetching animal data:', error);
    });
  }

  FormSubmitUser(data: any) {

    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }

    // Call the service to handle the form submission
    this._ser.AddAnimal(form, this.animalId, this.userId).subscribe(() => {
      debugger;
      alert("Application submitted successfully!");
      this._router.navigate([`/AnimalDetails/${this.animalId}`]);
    }, (error) => {
      alert('Error adding adoption application: ' + error.error);
    });
  }
}
