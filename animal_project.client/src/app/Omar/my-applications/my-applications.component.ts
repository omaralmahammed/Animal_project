import { Component } from '@angular/core';
import { OmarService } from '../omar.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrl: './my-applications.component.css'
})
export class MyApplicationsComponent {


  ngOnInit() {
    this.getUserInfo()
  }
  constructor(private _ser: OmarService) { }


  userId: any = localStorage.getItem("UserId")

  ApplicationsInfo: any;

  getUserInfo() {
    this._ser.getApplications(this.userId).subscribe((data) => {
      this.ApplicationsInfo = data;
    })
  }

}
