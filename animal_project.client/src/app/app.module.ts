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
import { RegistrationComponent } from './Omar/registration/registration.component';
import { LoginComponent } from './Omar/login/login.component';
import { CategoryComponent } from './Raneem/category/category.component';
import { AllAnimalComponent } from './Raneem/all-animal/all-animal.component';
import { NavBarComponent } from './Hadeel/nav-bar/nav-bar.component';
import { FormComponent } from './Hadeel/form/form.component';
import { ProfileComponent } from './Omar/profile/profile.component';

@NgModule({
  declarations: [

    PostComponent,
    CommentComponent,
    ReplyComponent,
    AppComponent,
    HomeComponent,
    AdminSideComponent,
    NavBarComponent,
    RegistrationComponent,
    LoginComponent,
    CategoryComponent,
    AllAnimalComponent
    AdminSideComponent,
    NavBarComponent,
    FormComponent
    LoginComponent,
    ProfileComponent
    CategoryComponent,
    ContactComponent,
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
      { path: 'Contact', component: ContactComponent }, 
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'posts', component: PostComponent },
      { path: 'reply', component: ReplyComponent },
      { path: 'comments', component: CommentComponent },










      {path: 'Admin', component: AdminSideComponent, children:
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
