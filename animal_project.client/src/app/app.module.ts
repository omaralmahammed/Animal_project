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
import { GetAllContactsComponent } from './Admin/get-all-contacts/get-all-contacts.component';
import { ReplyMessegesAdminComponent } from './Admin/reply-messeges-admin/reply-messeges-admin.component';
import { GetAnimalAdminComponent } from './Admin/get-animal-admin/get-animal-admin.component';
import { UpdatAnimalAdminComponent } from './Admin/updat-animal-admin/updat-animal-admin.component';
import { AddAnimalAdminComponent } from './Admin/add-animal-admin/add-animal-admin.component';
import { GetShelterAdminComponent } from './Admin/get-shelter-admin/get-shelter-admin.component';
import { UpdateShelterAdminComponent } from './Admin/update-shelter-admin/update-shelter-admin.component';
import { AddShelterAdminComponent } from './Admin/add-shelter-admin/add-shelter-admin.component';
import { OrderFormComponent } from './Admin/order-form/order-form.component';
import { GetAllUsersComponent } from './Admin/get-all-users/get-all-users.component';
import { GetUserApplicationComponent } from './Admin/get-user-application/get-user-application.component';
import { MyApplicationsComponent } from './Omar/my-applications/my-applications.component';




@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    CommentComponent,
    ReplyComponent,
    HomeComponent,
    AdminSideComponent,
    RegistrationComponent,
    CategoryComponent,
    AllAnimalComponent,
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
    GetAllContactsComponent,
    ReplyMessegesAdminComponent,
    GetAnimalAdminComponent,
    UpdatAnimalAdminComponent,
    AddAnimalAdminComponent,
    GetShelterAdminComponent,
    OrderFormComponent,
    UpdateShelterAdminComponent,
    AddShelterAdminComponent,
    GetAllUsersComponent,
    GetUserApplicationComponent,
    MyApplicationsComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
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
      { path: 'myApp', component: MyApplicationsComponent },










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
            { path: "PostsByStoryId", component: GetByStoryIdComponent },

            { path: 'getCategoryAdmin', component: GetCategoryAdminComponent },
            { path: 'updatCategoryAdmin/:id', component: UpdatCtegoryAdminComponent },
            { path: 'AddCategoryAdmin', component: AddCategoryAdminComponent },

            { path: 'AllContactsAdmin', component: GetAllContactsComponent },
            { path: 'ReplyContactAdmin/:id', component: ReplyMessegesAdminComponent },

            { path: 'getAnimalAdmin', component: GetAnimalAdminComponent },
            { path: 'updatAnimalAdmin/:id', component: UpdatAnimalAdminComponent },
            { path: 'AddAnimalAdmin', component: AddAnimalAdminComponent },
            { path: 'getSheltersAdmin', component: GetShelterAdminComponent },
            { path: 'UpdateShelterAdmin/:id', component: UpdateShelterAdminComponent },
            { path: 'AddShelterAdmin', component: AddShelterAdminComponent },

            { path: 'AllOrder', component: OrderFormComponent },
            { path: 'AllUsersAdmin', component: GetAllUsersComponent },
            { path: 'UserApplications/:id', component: GetUserApplicationComponent},
          ]
      }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
