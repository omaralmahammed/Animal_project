import { Component } from '@angular/core';
import { SuhaService } from '../../Suha/suha.service';

@Component({
  selector: 'app-get-by-story-id',
  templateUrl: './get-by-story-id.component.html',
  styleUrl: './get-by-story-id.component.css'
})
export class GetByStoryIdComponent {
  posts: any[] = [];
  errorMessage: string = '';

  constructor(private postService: SuhaService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  // Load all posts by StoryId
  loadPosts(): void {
    const storyId = 1; // Replace with actual StoryId
    this.postService.getAllPosts(storyId).subscribe(
      data => {
        console.log('Posts loaded:', data); // Log the retrieved posts
        this.posts = data;
      },
      error => {
        console.error('Error loading posts:', error); // Log the error
        this.errorMessage = 'Could not load posts';
      }
    );
  }

  // Update the flag for a post (accept/reject)
  updateFlag(post: any, flagValue: boolean): void {
    this.postService.updateFlag(post.storyId, flagValue).subscribe(
      response => {
        console.log('Post updated:', response);
        post.flag = flagValue; // Update locally once the flag is changed on the server
      },
      error => {
        console.error('Error updating post:', error);
        this.errorMessage = 'Could not update the post';
      }
    );
  }
}

