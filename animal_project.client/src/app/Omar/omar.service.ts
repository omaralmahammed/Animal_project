import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmarService {

  constructor(private http: HttpClient) { }


  baseUrl = "https://localhost:44378/api/"


  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Omar/Register`, data)
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Omar/Login`, data)
  }

  updateInfo(data: any, userId: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Omar/UpdateUserInformation/${userId}`, data)
  }

  getInfo(userId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}Omar/GetUserInformation/${userId}`)
  }

  getApplications(userId: any): Observable<any>{
    return this.http.get(`${this.baseUrl}Omar/GetUserApplications/${userId}`)
  }
}
