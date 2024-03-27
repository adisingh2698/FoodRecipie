import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RpasswordComponent } from './pages/rpassword/rpassword.component';
import { AdmindashboardComponent } from './pages/admindashboard/admindashboard.component';
import { UserdashboardComponent } from './pages/userdashboard/userdashboard.component';
import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
import { UserhomeComponent } from './pages/userhome/userhome.component';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { WelcomepageComponent } from './pages/welcomepage/welcomepage.component';
import { AdminReviewComponent } from './pages/adminreview/adminreview.component';
import { UserReviewComponent } from './pages/userreview/userreview.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomepageComponent, //
  },
  {
    path: 'signIn',
    component: SigninComponent, //
  },
  {
    path: 'signup',
    component: SignupComponent, //
  },
  {
    path: 'resetpassword',
    component: RpasswordComponent, //
  },
  {
    path: 'admindashboard',
    component: AdmindashboardComponent,
    children: [
      {
        path: 'home',
        component: AdminhomeComponent, 
      },
      {
        path: 'adminreview', 
        component: AdminReviewComponent,
      },
    ],
  },
  {
    path: 'userdashboard',
    component: UserdashboardComponent,
    children: [
      {
        path: 'home', 
        component: UserhomeComponent,
      },
      {
        path: 'profile',
        component: UserprofileComponent, //
      },
      {
        path: 'review', //
        component: UserReviewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
