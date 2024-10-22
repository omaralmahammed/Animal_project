import { Component, OnInit } from '@angular/core';
import { RahafService } from '../rahaf.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: any[] = []; // استخدم مصفوفة من 'any'
  newComment: string = ''; // المتغير لتخزين التعليق الجديد
  currentUserId: number = 2; // استبدل هذا بـ ID المستخدم الحالي من سياق التطبيق
  newReply: string = '';

  constructor(private _ser: RahafService) { }

  ngOnInit() {
    this.GetALLPosts();
  }

  GetALLPosts() {
    this._ser.getAllPosts().subscribe(
      (data: any) => {
        console.log('Fetched Posts with Comments:', data);
        this.posts = data.map((post: any) => ({ ...post, showComments: false, showAllComments: false })); // إضافة خصائص جديدة
      },
      error => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  addComment(post: any) {
    if (this.newComment.trim()) {
      const commentData = {
        postId: post.postId,
        userId: this.currentUserId,
        content: this.newComment
      };

      this._ser.CreateComment(commentData).subscribe(
        response => {
          console.log('Comment added successfully:', response);
          post.comments.push({
            content: commentData.content,
            userId: this.currentUserId,
            commentDate: new Date(),
            user: { userName: 'Current User' }
          });
          this.newComment = '';
        },
        error => {
          console.error('Error adding comment:', error);
        }
      );
    }
  }

  addReply(comment: any) {
    if (this.newReply.trim()) {
      const replyData = {
        commentId: comment.commentId,
        userId: this.currentUserId,
        content: this.newReply
      };

      this._ser.CreateReply(replyData).subscribe(
        response => {
          console.log('Reply added successfully:', response);
          comment.replies.push({
            content: replyData.content,
            userId: this.currentUserId,
            replyDate: new Date(),
            user: { userName: 'Current User' }
          });
          this.newReply = '';
          comment.replying = false;
        },
        error => {
          console.error('Error adding reply:', error);
        }
      );
    }
  }

  toggleComments(post: any) { // دالة لتبديل إظهار وإخفاء التعليقات
    post.showComments = !post.showComments;
    if (!post.showComments) {
      post.showAllComments = false; // إعادة تعيين إظهار جميع التعليقات
    }
  }

  showMoreComments(post: any) { // دالة لإظهار جميع التعليقات
    post.showAllComments = true;
  }

  hideComments(post: any) { // دالة لإخفاء جميع التعليقات
    post.showAllComments = false;
  }

  toggleReplies(comment: any) { // دالة لتبديل إظهار وإخفاء الردود
    comment.showReplies = !comment.showReplies;
  }
}
