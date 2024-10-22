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

}
