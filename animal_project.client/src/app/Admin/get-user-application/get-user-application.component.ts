import { Component, OnInit } from '@angular/core';
import { UrlAdminYousefService } from '../get-all-contacts/yousefUrlAdmin/url-admin-yousef.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-get-user-application',
  templateUrl: './get-user-application.component.html',
  styleUrls: ['./get-user-application.component.css']
})
export class GetUserApplicationComponent implements OnInit {
  applicationArray: any[] = [];

  constructor(
    private _service: UrlAdminYousefService,
    private route: ActivatedRoute  ){ }

  ngOnInit(): void {
    const userId = +this.route.snapshot.paramMap.get('id')!;

    this._service.getApplicationById(userId).subscribe(

      (data) => {

        this.applicationArray = [data]; 
      },

      (error) => {
        console.error('Error fetching application data:', error);
      }
    );

  }


}
