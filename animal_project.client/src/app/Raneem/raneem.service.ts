import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RaneemService {

 staticData = "https://localhost:7119/api";
  constructor(private http: HttpClient) { }

  GetAllCategory(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Raneem/GetAllCategory`);
  }

  getAllAnimal(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Raneem/GetAnimalsByCategoryId/${id}`);
  }
}
