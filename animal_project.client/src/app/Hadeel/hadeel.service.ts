import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HadeelService {

  staticData = "https://localhost:44378/api";

  constructor(private http: HttpClient) { }

  


  GetDAnimal(id : any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Hadeel/GetAnimalDetails?id=${id}`);
  }

  AddAnimal(data: any, animalId: any, userId: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Hadeel/AddUserForm/${userId}/${animalId}`, data)
  }

  GetAllOrder(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Hadeel/GetAllOrder`)
  }

  GetAllOrderDetails(id : any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Hadeel/GetDetailsAllOrder?id=${id}`)
  }

  ApprovedAdoption(id: any , data:any): Observable<any> {
    return this.http.put<any>(`${this.staticData}/Hadeel/AdminApproved?id=${id}`,data)
  }

  //getAllAdoptionAnimal(id: any): Observable<any> {

  //}
}
