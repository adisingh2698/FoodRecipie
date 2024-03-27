import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
// import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-rpassword',
  templateUrl: './rpassword.component.html',
  styleUrls: ['./rpassword.component.css'],
})
export class RpasswordComponent {
  EmailID = 'Hello@email.com';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  buttonVisible = false;
  IsEmailIDExist = false;
  constructor(
    // private toastr: ToastrService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private _authenticationService: AuthenticationService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  handleNevigateSignIn() {
    this.router.navigate(['/signIn']);
  }

  handleSubmit() {
    if (this.handleValidation()) {
      if ($('#newPassword').val() !== $('#confirmPassword').val()) {
        this.openSnackBar('New Password & Confirm Password Not Match');
        return;
      }

      let _data = {
        userId: $('#userId').val(),
        emailId: $('#emailId').val(),
        password: $('#newPassword').val(),
      };
      this.spinner.show();
      this._authenticationService.ChangePassword(_data).subscribe({
        next: (result) => {
          this.spinner.hide();
          console.log('Result : ', result.message);
          this.openSnackBar('Password Reset Successfully');
          this.IsEmailIDExist = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.spinner.hide();
          this.openSnackBar('Something went wrong');
        },
      });
    } else {
      this.openSnackBar('Please Enter Required Field');
    }
  }

  handleValidation() {
    $('#newPasswordHelp').hide();
    $('#confirmPasswordHelp').hide();
    let Value = true;

    if (!$('#newPassword').val()) {
      $('#newPasswordHelp').show();
      Value = false;
    }
    if (!$('#confirmPassword').val()) {
      $('#confirmPasswordHelp').show();
      Value = false;
    }

    return Value;
  }

  handleResetPassword() {
    if (this.IsEmailIDExist) {
      this.handleSubmit();
    } else {
      this.handleFindEmail();
    }
  }

  handleFindEmail() {
    $('#emailHelp').hide();
    let email = $('#emailId').val();
    if (email !== '') {
      this._authenticationService.findEmail(email).subscribe({
        next: (result: any) => {
          
          console.log('Result : ', result);
          this.IsEmailIDExist = true;
          this.openSnackBar('UserName Exist');
        },
        error: (error: any) => {
          
          console.log('Error : ', error);
          this.IsEmailIDExist = false;
          this.openSnackBar('UserName Not Exist');
        },
      });
    } else {
      $('#emailHelp').show();
      this.openSnackBar('Please Enter Username');
    }
  }

  handleChange() {
    if ($('#newPassword').val() === $('#confirmPassword').val()) {
      this.buttonVisible = true;
    } else {
      this.buttonVisible = false;
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }
}
