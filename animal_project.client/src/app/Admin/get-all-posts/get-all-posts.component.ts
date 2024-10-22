import { Component } from '@angular/core';
import { SuhaService } from '../../Suha/suha.service';

@Component({
  selector: 'app-get-all-posts',
  templateUrl: './get-all-posts.component.html',
  styleUrl: './get-all-posts.component.css'
})
export class GetAllPostsComponent {
  posts: any[] = [];
  errorMessage: string | null = null;

  constructor(private postService: SuhaService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (err) => {
        this.errorMessage = 'Error loading posts';
      }
    });
  }

  deletePost(id: number): void {
    // Implement delete functionality here (API call to delete the post)
  }

}
