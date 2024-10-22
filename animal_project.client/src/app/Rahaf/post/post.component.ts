import { Component, OnInit } from '@angular/core';
import { RahafService } from '../rahaf.service';

interface Comment {
  CommentId: number;
  CommentText: string;
  UserName: string;
  CommentDate: Date; // يمكنك استخدام string حسب نوع البيانات لديك
}

// تعريف واجهة المشاركة
interface Post {
  PostId: number;
  UserName: string;
  AnimalName: string;
  StoryText: string;
  StoryDate: Date; // يمكنك استخدام string حسب نوع البيانات لديك
  Image1: string;
  Image2?: string; // يمكن أن تكون غير موجودة
  LikeNumber: number;
  Comments: Comment[]; // هنا نقوم بربط التعليقات
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'] // تم تصحيح 'styleUrl' إلى 'styleUrls'
})
export class PostComponent implements OnInit {
  posts: Post[] = []; // استخدام واجهة Post
  commentsToShow: number = 2;

  constructor(private _ser: RahafService) { }

  ngOnInit() {
    this.GetALLPosts();
  }

  GetALLPosts() {
    this._ser.getAllPosts().subscribe((data: Post[]) => { // تحديد نوع البيانات المسترجعة
      this.posts = data;
    });
  }

  showMoreComments(post: Post) {
    this.commentsToShow = post.Comments.length;
  }
}
