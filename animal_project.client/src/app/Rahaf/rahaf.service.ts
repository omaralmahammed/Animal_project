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
  CreateComment(data: any): Observable<any> {
    console.log("data is :", data)
    return this.http.post<any>(`${this.staticData}/Rahaf/CreateComment`, data)

  }
 
  CreateReply(data: any): Observable<any> {
    console.log("data is :", data)
    return this.http.post<any>(`${this.staticData}/Rahaf/CreateReply`, data)

  }
  CreatePost(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Rahaf/post`, data)

  }

  addLike(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Rahaf/addLike`, data)

  }
  
}
