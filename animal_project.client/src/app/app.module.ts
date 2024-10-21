import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // <-- Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './Rahaf/post/post.component';
import { CommentComponent } from './Rahaf/comment/comment.component';
import { ReplyComponent } from './Rahaf/reply/reply.component';
import { FormsModule } from '@angular/forms'; // Keep FormsModule import
import { RouterModule } from '@angular/router';
import { HomeComponent } from './Hadeel/home/home.component';
import { RouterModule } from '@angular/router';
import { AdminSideComponent } from './Admin/admin-side/admin-side.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    CommentComponent,
    ReplyComponent,
    AppComponent,
    HomeComponent,
    AdminSideComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule,
    RouterModule.forRoot([
      { path: 'Posts', component: PostComponent },

    ])
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'Admin', component: AdminSideComponent }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
