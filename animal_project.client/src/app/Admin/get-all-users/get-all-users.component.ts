import { Component } from '@angular/core';
import { UrlAdminYousefService } from '../get-all-contacts/yousefUrlAdmin/url-admin-yousef.service';

@Component({
  selector: 'app-get-all-users',
  templateUrl: './get-all-users.component.html',
  styleUrl: './get-all-users.component.css'
})
export class GetAllUsersComponent {


  param: any
  ngOnInit() {
    this.getUsersAdmin();
  }
  UsersArray: any[] = [];

  constructor(private _ser2: UrlAdminYousefService) { }

  ComentsArray: any

  getUsersAdmin() {

    this._ser2.getUsersAdmin().subscribe((data) => {

      this.UsersArray = data;

      console.log("Services", this.UsersArray)
    })

  }

}
