import { Component } from '@angular/core';
import { UrlAdminYousefService } from './yousefUrlAdmin/url-admin-yousef.service';

@Component({
  selector: 'app-get-all-contacts',
  templateUrl: './get-all-contacts.component.html',
  styleUrl: './get-all-contacts.component.css'
})
export class GetAllContactsComponent {

 

  param: any
  ngOnInit() {
    this.getComents();
  }

  constructor(private _ser2: UrlAdminYousefService) { }

  ComentsArray: any

  getComents() {

    this._ser2.getComents().subscribe((data) => {

      this.ComentsArray = data;

      console.log("Services", this.ComentsArray)
    })

  }
}


