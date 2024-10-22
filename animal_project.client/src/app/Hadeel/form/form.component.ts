import { Component } from '@angular/core';
import { HadeelService } from '../hadeel.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  id: any;
  ngOnInit() {
    this.GetAnimal()
  }
  constructor(private _ser: HadeelService) { }

  AnimalAraay: any
  GetAnimal() {

    this._ser.GetDAnimal(this.id).subscribe((data) => {
      this.AnimalAraay = data
      console.log(this.AnimalAraay)

    })
  }


  FormSubmitUser(data: any) {
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }

  }
}
