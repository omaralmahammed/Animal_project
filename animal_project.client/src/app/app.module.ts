import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentComponent } from './Rahaf/comment/comment.component';
import { ReplyComponent } from './Rahaf/reply/reply.component';
import { HomeComponent } from './Hadeel/home/home.component';
import { PostComponent } from './Rahaf/post/post.component';
import { RouterModule } from '@angular/router';
import { AdminSideComponent } from './Admin/admin-side/admin-side.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ContactComponent } from './Yousef/contact/contact.component';

@NgModule({
  declarations: [
    
    PostComponent,
    CommentComponent,
    ReplyComponent,
    AppComponent,
    HomeComponent,
    AdminSideComponent,
    NavBarComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'Posts', component: PostComponent },
      { path: 'Contact', component: ContactComponent},
      {
        path: 'Admin', component: AdminSideComponent, children:
          [

        ]
    }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
