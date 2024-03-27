import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  showPassword: boolean = false;
  role = 'USER';
  constructor(
    private _authService: AuthenticationService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  handleSubmit(registrationForm: NgForm) {
    if (registrationForm.valid) {
      if ($('#confirmPassword').val()?.toString() !== $('#password').val()?.toString()) {
        this.openSnackBar('Password & Confirm Password Not Match');
        return;
      }

      let _data = {
        email: $('#email').val()?.toString().trim(),
        password: $('#password').val()?.toString(),
        role: this.role.toUpperCase(),
      };

      // SPINNER VISIBLE
      this.spinner.show();
      this._authService.SignUp(_data).subscribe(
        (result: any) => {
          this.spinner.hide();
          this.openSnackBar('SignUp Successfully');
          this.handleClear();
        },
        (error: any) => {
          this.spinner.hide();
          this.openSnackBar('Something went wrong');
        }
      );
    } else {
      this.openSnackBar('Please Enter Required Field');
    }
  }

  handleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  handleSignIn() {
    this.router.navigate(['/signIn']);
  }

  handleClear() {
    $('#email').val('');
    $('#password').val('');
    $('#confirmPassword').val('');
  }
}
