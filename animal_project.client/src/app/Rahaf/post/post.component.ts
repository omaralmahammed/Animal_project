import { Component } from '@angular/core';
import { RahafService } from '../rahaf.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  posts: any;
  ngOnInit() {
    this.GetALLPosts()
  }
  
  constructor(private _ser: RahafService) { }

  GetALLPosts() {
    this._ser.getAllPosts().subscribe((data) => {
      this.posts = data;
    })
  }
}
