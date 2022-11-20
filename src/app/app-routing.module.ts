
import { NgModule } from "@angular/core";
import {  OutletContext,RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { NewsComponent } from "./news/news.component";
import { AboutComponent } from "./about/about.component";
import { CoursesComponent } from "./courses/courses.component";
import { DashboardComponent } from "./admin/dashboard/dashboard.component";
import { LayoutComponent } from "./admin/layout/layout.component";
import { CreateCourseComponent } from './admin/create-course/create-course.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from "@angular/fire/auth-guard";
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);
const redirectLoggedInToHome = () => redirectLoggedInTo(["home"]);

const routes: Routes = [
{
    path:'sing',
    component: RegisterComponent
  },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'news', component: NewsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'courses', component: CoursesComponent },
  { path: '', component: HomeComponent },


  {
    path: "login",
    component: LoginComponent,
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },

   { path: 'layout', component:LayoutComponent,
   children:[ 
      { path: '', component: DashboardComponent ,outlet:'second' },
    { path: 'create-course', component:CreateCourseComponent,outlet:'second' },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
