import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlAdminYousefService {

  private apiUrl = 'https://localhost:44378/api';


  constructor(private http: HttpClient) { }


  ///////////////////////////
  //     admin side    //

  getComents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Yousef/GetAllMessage`);
   }

  getComentsById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Yousef/GetMessage/${id}`);
  }

  postContactFormEmail(contactFormData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Yousef/PostMessageToEmail`, contactFormData);
  }

}
