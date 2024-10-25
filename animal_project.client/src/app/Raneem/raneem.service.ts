import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RaneemService {

 staticData = "https://localhost:44378/api";
  constructor(private http: HttpClient) { }


  //Category Api///////////////////
  GetAllCategory(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Raneem/GetAllCategory`);
  }

  AddCategory(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Raneem/CreateCategory`, data)
  }

  Updatecategory(id: any, data: any): Observable<any> {

    return this.http.put(`${this.staticData}/Raneem/UpdateCategory/${id}`, data)
  }

  deletCategory(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Raneem/DeleteCategory/${id}`)
  }

  getCategorybyID(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Raneem/GetcategoryById/${id}`);
  }


  //Animal Api//////////////////////////////////////////////////////////////////////

  getAllAnimal(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Raneem/GetAnimalsByCategoryId/${id}`);
  }


  Getanimal(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Raneem/GetAllAnimal`);
  }

  getAnimalDetails(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Raneem/AnimalById/${id}`);
  }


  AddAnimal(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Raneem/CreateAnimal`, data)
  }


  UpdateAnimal(id: any, data: any): Observable<any> {

    return this.http.put(`${this.staticData}/Raneem/UpdateAnimal/${id}`, data)
  }


  deletAnimal(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Raneem/DeleteAnimal/${id}`)
  }

  //shelter////////////////////////////////////////////////////////////////////

  GetShelter(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Raneem/Shelters`);
  }

  getShelterById(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Raneem/ShelterById/${id}`);
  }


  AddShelter(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Raneem/CreateShelter`, data)
  }


  UpdateShelter(id: any, data: any): Observable<any> {

    return this.http.put(`${this.staticData}/Raneem/UpdateShelter/${id}`, data)
  }

  deletShelter(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Raneem/DeleteShelter/${id}`)
  }
}
