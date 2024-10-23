import { Component, OnInit } from '@angular/core';
import { RahafService } from '../rahaf.service';
import Swal from 'sweetalert2'; // استيراد SweetAlert

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: any[] = [];
  newComment: string = '';
  currentUserId: number = 2;
  newReply: string = '';

  // منشور جديد
  newPost: any = {
    storyText: '',
    image1: null,
    image2: null,
    animalId: null,
    storyDate: new Date()
  };

  constructor(private _ser: RahafService) { }

  ngOnInit() {
    this.GetALLPosts();
  }

  //////////////////////////////////////////////////////////////////

  GetALLPosts() {
    
    this._ser.getAllPosts().subscribe(
      (data: any) => {
  
        if (!data || !Array.isArray(data)) {
          console.error('Invalid data format');
          return;
        }

        if (data.length === 0) {
          console.warn('No posts found');
        }
        
        this.posts = data
          .filter((post: any) => post.flag === true) 
          .sort((a: any, b: any) => new Date(b.storyDate).getTime() - new Date(a.storyDate).getTime())
          .map((post: any) => ({ ...post, showComments: false, showAllComments: false }));
      },
      error => {
        console.error('Error fetching posts:', error);
      }
    );
  }


  //////////////////////////////////////////////////////////////////

  shareOnX(post: any) {
    const postUrl = `https://www.islambook.com/azkar/16/%D8%AF%D8%B9%D8%A7%D8%A1-%D8%AE%D8%AA%D9%85-%D8%A7%D9%84%D9%82%D8%B1%D8%A2%D9%86-%D8%A7%D9%84%D9%83%D8%B1%D9%8A%D9%85#google_vignette`; // استبدل هذا بالرابط الفعلي للبوست
    const tweetText = encodeURIComponent(post.storyText); 
    const xShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(postUrl)}`;

    window.open(xShareUrl, '_blank');
  }

  //////////////////////////////////////////////////////////////////

  showAddPostAlert() {
    Swal.fire({
      title: 'Add New Post',
      html: `
      <textarea id="storyText" class="form-control" placeholder="Enter your story..." rows="3"></textarea>
      <input type="file" id="image1" class="form-control mt-2" />
      <input type="file" id="image2" class="form-control mt-2" />
    `,
      showCancelButton: true,
      confirmButtonText: 'Post',
      preConfirm: () => {
        const storyText = (document.getElementById('storyText') as HTMLTextAreaElement).value;
        const image1 = (document.getElementById('image1') as HTMLInputElement).files?.[0];
        const image2 = (document.getElementById('image2') as HTMLInputElement).files?.[0];

        return { storyText, image1, image2 };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.newPost.storyText = result.value?.storyText || '';
        this.newPost.image1 = result.value?.image1 || null;
        this.newPost.image2 = result.value?.image2 || null;

        if (this.newPost.storyText.trim()) {
          this.addPost();
        }
      }
    });
  }
  //////////////////////////////////////////////////////////////////

  addPost() {
    if (this.newPost.storyText.trim()) {
      const formData = new FormData();
      formData.append('UserId', this.currentUserId.toString());
      formData.append('StoryText', this.newPost.storyText);
      formData.append('StoryDate', this.newPost.storyDate.toISOString());

      formData.append('Flag', 'false'); 

      if (this.newPost.image1) formData.append('Image1', this.newPost.image1);
      if (this.newPost.image2) formData.append('Image2', this.newPost.image2);

      this._ser.CreatePost(formData).subscribe(
        (response: any) => {
          console.log('Post added successfully:', response);

          Swal.fire({
            title: 'Post Submitted!',
            text: 'Thank you! Your post will be reviewed by the admin.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.newPost = { storyText: '', image1: null, image2: null, animalId: null, storyDate: new Date() };
          });
        },
        (error) => {
          console.error('Error adding post:', error);
        }
      );
    }
  }


  //////////////////////////////////////////////////////////////////
  onFileChange(event: any, imageNumber: number) {
    const file = event.target.files[0];
    if (imageNumber === 1) {
      this.newPost.image1 = file;
    } else if (imageNumber === 2) {
      this.newPost.image2 = file;
    }
  }

//////////////////////////////////////////////////////////////////
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

          Swal.fire({
            title: 'Comment added successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });

        },
        error => {
          console.error('Error adding comment:', error);
        }
      );
    }
  }

  //////////////////////////////////////////////////////////////////
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
          Swal.fire({
            title: 'Reply added successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });

        },
        error => {
          console.error('Error adding reply:', error);
        }
      );
    }
  }

  //////////////////////////////////////////////////////////////////
  toggleComments(post: any) {
    post.showComments = !post.showComments;
    if (!post.showComments) {
      post.showAllComments = false;
    }
  }

  //////////////////////////////////////////////////////////////////

  showMoreComments(post: any) {
    post.showAllComments = true;
  }

  //////////////////////////////////////////////////////////////////

  hideComments(post: any) {
    post.showAllComments = false;
  }

  //////////////////////////////////////////////////////////////////

  toggleReplies(comment: any) {
    comment.showReplies = !comment.showReplies;
  }

  //////////////////////////////////////////////////////////////////
  toggleLike(postId: number, post: any): void {
    console.log('Post object:', post); // تحقق من كائن post
    console.log('Post ID:', postId); // تحقق من قيمة postId

    if (!postId) {
      console.error('Post ID is undefined or invalid');
      return;
    }

    this._ser.toggleLike(postId).subscribe(
      response => {
        if (response && response.likeCount !== undefined) {
          post.likeNumber = response.likeCount;
          post.likeStatus = !post.likeStatus;
        } else {
          console.error('Invalid response structure:', response);
        }
      },
      error => {
        console.error('Error toggling like:', error);
      }
    );
  }




}
