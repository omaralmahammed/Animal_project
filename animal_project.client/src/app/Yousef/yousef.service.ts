import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YousefService {

  private apiUrl = 'https://localhost:44378/api';

  constructor(private http: HttpClient) { }


  postContactForm(contactFormData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Yousef/PostMessage`, contactFormData);

  }

}
