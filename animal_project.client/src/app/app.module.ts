import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './Rahaf/post/post.component';
import { CommentComponent } from './Rahaf/comment/comment.component';
import { ReplyComponent } from './Rahaf/reply/reply.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    CommentComponent,
    ReplyComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
