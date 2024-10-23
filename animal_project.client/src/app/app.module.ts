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
import { RegistrationComponent } from './Omar/registration/registration.component';
import { LoginComponent } from './Omar/login/login.component';
import { CategoryComponent } from './Raneem/category/category.component';
import { AllAnimalComponent } from './Raneem/all-animal/all-animal.component';
import { FormComponent } from './Hadeel/form/form.component';
import { ContactComponent } from './Yousef/contact/contact.component';
import { AboutComponent } from './Yousef/about/about.component';
import { ProfileComponent } from './Omar/profile/profile.component';
import { GetAllPostsComponent } from './Admin/get-all-posts/get-all-posts.component';
import { GetByStoryIdComponent } from './Admin/get-by-story-id/get-by-story-id.component';
import { AnimalDetailsComponent } from './Raneem/animal-details/animal-details.component';
import { GetCategoryAdminComponent } from './Admin/get-category-admin/get-category-admin.component';
import { FooterComponent } from './footer/footer.component';
import { UpdatCtegoryAdminComponent } from './Admin/updat-ctegory-admin/updat-ctegory-admin.component';
import { AddCategoryAdminComponent } from './Admin/add-category-admin/add-category-admin.component';
import { OrderFormComponent } from './Admin/order-form/order-form.component';


@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    CommentComponent,
    ReplyComponent,
    HomeComponent,
    ReplyComponent,
    AppComponent,
    HomeComponent,
    AdminSideComponent,
    RegistrationComponent,
    CategoryComponent,
    AllAnimalComponent,
    AdminSideComponent,
    NavBarComponent,
    FormComponent,
    LoginComponent,
    ContactComponent,
    ProfileComponent,
    GetAllPostsComponent,
    GetByStoryIdComponent,
    
    AnimalDetailsComponent,
    GetCategoryAdminComponent,
    FooterComponent,
    UpdatCtegoryAdminComponent,
    AddCategoryAdminComponent,
    OrderFormComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },

      //OMAR

      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
     
      { path: 'login', component: LoginComponent },
      { path: 'profile', component: ProfileComponent },










      //RAHAF

      { path: 'posts', component: PostComponent },
      { path: 'reply', component: ReplyComponent },
      { path: 'comments', component: CommentComponent },
      { path: 'Animal/:id', component: AllAnimalComponent },















      //Hadeel
      { path: 'UserForm/:id', component: FormComponent },












      //Yousef

      { path: 'Contact', component: ContactComponent },
      { path: 'About', component: AboutComponent },












      //Raneem

 { path: 'category', component: CategoryComponent },
      { path: 'Animal/:id', component: AllAnimalComponent },
      { path: 'AnimalDetails/:id', component: AnimalDetailsComponent },
      













      //SUHA










      {
        path: 'Admin', component: AdminSideComponent, children:

          [
            { path: "AllPosts", component: GetAllPostsComponent },


            { path: 'getCategoryAdmin', component: GetCategoryAdminComponent },
            { path: 'updatCategoryAdmin/:id', component: UpdatCtegoryAdminComponent },
            { path: 'AddCategoryAdmin', component: AddCategoryAdminComponent },
            { path: 'AllOrder', component: OrderFormComponent },
          ]
      }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
