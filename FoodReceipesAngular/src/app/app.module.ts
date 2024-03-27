import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
  BrowserModule,
  // provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MaterialUiModule } from './shared/material-ui/material-ui.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RpasswordComponent } from './pages/rpassword/rpassword.component';
import { UserdashboardComponent } from './pages/userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './pages/admindashboard/admindashboard.component';
import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
import { UserhomeComponent } from './pages/userhome/userhome.component';

import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { WelcomepageComponent } from './pages/welcomepage/welcomepage.component';
import { AdminReviewComponent } from './pages/adminreview/adminreview.component';
import { UserReviewComponent } from './pages/userreview/userreview.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReceipeinfodialogComponent } from './pages/receipeinfodialog/receipeinfodialog.component';
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    RpasswordComponent,
    UserdashboardComponent,
    AdmindashboardComponent,
    AdminhomeComponent,
    UserhomeComponent,
   
    UserprofileComponent,
    WelcomepageComponent,
    AdminReviewComponent,
    UserReviewComponent,
    ReceipeinfodialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    MaterialUiModule,
    MatDialogModule
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
