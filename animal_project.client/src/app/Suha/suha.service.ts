import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuhaService {
  private apiUrl = 'https://localhost:44378/api/'; // Adjust your API URL

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}Categories/AllCategories`);
  }


  //getPostsByStoryId(storyId: number): Observable<Post[]> {
  //  return this.http.get<Post[]>(`${this.apiUrl}/GetAllPostsbyStory${storyId}`).pipe(
  //    catchError(this.handleError)
  //  );
  //}

 
}

