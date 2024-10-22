import { Component } from '@angular/core';
import { SuhaService } from '../../Suha/suha.service';

@Component({
  selector: 'app-get-by-story-id',
  templateUrl: './get-by-story-id.component.html',
  styleUrl: './get-by-story-id.component.css'
})
export class GetByStoryIdComponent {
  //posts: Post[] = [];
  //errorMessage: string | null = null;

  //constructor(private postService: SuhaService) { }

  //ngOnInit(): void {
  //  const storyId = 1; // Replace with the actual story ID you want to fetch
  //  this.getPosts(storyId);
  //}

  //getPosts(storyId: number): void {
  //  this.postService.getPostsByStoryId(storyId).subscribe({
  //    next: (data) => {
  //      this.posts = data;
  //    },
  //    error: (error) => {
  //      this.errorMessage = error; // Set error message
  //    }
  //  });
  //}

  //deletePost(storyId: number): void {
  //  // Implement delete logic if needed
  //  console.log('Delete post with ID:', storyId);
  //}
}
