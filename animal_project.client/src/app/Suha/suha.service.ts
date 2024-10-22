import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuhaService {
  private apiUrl = 'https://localhost:44378/api/Suha/GetAllPosts'; // Adjust your API URL
  private urlpost = 'https://localhost:44378/api/Suha/GetAllPostsbyStory'; // Base URL for posts
  private update = 'https://localhost:44378/api/Suha/UpdateFlag'; // Base URL for updating flag

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  //----------------
 
  // Get all posts by StoryId
  getAllPosts(storyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlpost}/${storyId}`);
  }

  // Update flag (accept/reject) by StoryId
  updateFlag(storyId: number, flag: boolean): Observable<any> {
    return this.http.put(`${this.update}/${storyId}`, flag);
  }
}







