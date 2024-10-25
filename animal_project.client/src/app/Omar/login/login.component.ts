import { Component } from '@angular/core';
import { OmarService } from '../omar.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  animalId = localStorage.getItem("animalId");
  constructor(private _ser: OmarService, private _router: Router) { }


  isAdmin: any;

  checkUser(data: any) {

    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }

    this._ser.login(form).subscribe((data) => {
      localStorage.setItem("UserId", data.userId);

      Swal.fire({
        icon: "success",
        title: `Welcome ${data.userName}`,
        showConfirmButton: false,
        timer: 2000
      });
      if (this.animalId !== null) {
        this._router.navigate([`/AnimalDetails/${this.animalId}`])
        localStorage.removeItem("animalId");
      }
      else {
        

        if (data.flag === false) {
          this.isAdmin = data.flag
          this._router.navigate(['/'])
        } else {
          this.isAdmin = data.flag
          this._router.navigate(['/Admin'])
        }
      }
    },
      (error) => {
        Swal.fire({
          icon: "error",
          title: (error.error),
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }
}
