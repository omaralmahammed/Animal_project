import { Component } from '@angular/core';
import { OmarService } from '../omar.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  ngOnInit() {


  }
  constructor(private _ser: OmarService, private _router: Router) { }


  addNewUser(data: any) {

    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }

    const password = data.Password;
    const confirmPassword = data.ConfirmPassword;

    if (password === confirmPassword) {

    this._ser.register(form).subscribe(() => {
      Swal.fire({
        icon: "success",
        title: "Welcome You!",
        showConfirmButton: false,
        timer: 2000
      });
      this._router.navigate(['/login'])
    },
      (error) => {
        Swal.fire({
          icon: "error",
          title: (error.error),
          showConfirmButton: false,
          timer: 2000
        });
      }
     )
    }
  }
}
