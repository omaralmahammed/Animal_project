import { Component } from '@angular/core';
import { UrlAdminYousefService } from '../get-all-contacts/yousefUrlAdmin/url-admin-yousef.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reply-messeges-admin',
  templateUrl: './reply-messeges-admin.component.html',
  styleUrl: './reply-messeges-admin.component.css'
})
export class ReplyMessegesAdminComponent {


  param: any
  ngOnInit() {
    this.param = this._router.snapshot.paramMap.get("id")
    console.log("iddddd", this.param)
    this.getComentsById()
  }
  specificData: any
  subject: any
  email: any
  constructor(private _router: ActivatedRoute, private _ser: UrlAdminYousefService) { }
  getComentsById() {
    debugger
    this._ser.getComentsById(this.param).subscribe((data) => {
      this.specificData = data
      console.log(this.specificData, "aaaa")
      this.subject = this.specificData.subject
      this.email = this.specificData.email
      console.log("sss", this.subject)
    })
  }

  replayData = {

    Name: '',

    Email: '',

    Subject: '',

    MessageContent: ''
  }


  addNewComent(data: any) {

    data.Name = ''
    data.Email = this.email
    data.Subject = this.subject

    var form = new FormData();

    for (let key in data) {
      form.append(key, data[key])
    }
    form.append('contactId',this.param)
    this._ser.postContactFormEmail(form).subscribe(() => {

      alert("Coment Sent successfully")
      /*this._router.navigate(['']);*/
    },
      (error) => {
        alert(error.error)
      }
    )
  }
}

