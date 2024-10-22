import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RahafService {

  constructor(private http: HttpClient) { }



  staticData = "https://localhost:44378/api";

  getAllPosts(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Rahaf/GetAllPosts`);
  }

  getPostByID(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Rahaf/GetPost?id=${id}`);
  }

  //filter(name: any): Observable<any> {
  //  return this.http.get<any>(`${this.staticData}/Classes/filter?Name=${name}`);
  //}

  //getInstructorDetails(id: number): Observable<any> {
  //  return this.http.get<any>(`${this.staticData}/Classes/getInstructorByclassID?id=${id}`);
  //}

  //getJadwal(): Observable<any> {
  //  return this.http.get<any>(`${this.staticData}/Classes/GetAllClassSchedules`);
  //}
  //postCreatePayment(data: any): Observable<any> {
  //  console.log("data is :", data)
  //  return this.http.post<any>(`${this.staticData}/Classes/checkout`, data)

  //}

}
