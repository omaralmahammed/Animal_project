import { Component } from '@angular/core';
import { OmarService } from '../omar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


  ngOnInit() {
    this.getUserInfo()
  }
  constructor(private _ser: OmarService) { }


  userId: any = localStorage.getItem("UserId")

  UserInfo: any;

  getUserInfo() {
    this._ser.getInfo(this.userId).subscribe((data) => {
      this.UserInfo = data;
    })
  }
  

  updateUserInfo(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }

    const password = data.Password || '';  
    const confirmPassword = data.ConfirmPassword || ''; 

    if (password === confirmPassword) {
      this._ser.updateInfo(form, this.userId).subscribe((data) => {

        Swal.fire({
          icon: "success",
          title: `Your Information was updated`,
          showConfirmButton: false,
          timer: 2000
        });
      },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Something wronge happen!",
            showConfirmButton: false,
            timer: 2000
          });
        }
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Passwords not match!",
        showConfirmButton: false,
        timer: 2000
      });
    }


  }
}
