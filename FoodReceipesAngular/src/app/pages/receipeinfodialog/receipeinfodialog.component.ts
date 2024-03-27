import { Component, Inject } from '@angular/core';
import $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { localStorageSession } from '../../shared/localStorage';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-receipeinfodialog',
  templateUrl: './receipeinfodialog.component.html',
  styleUrl: './receipeinfodialog.component.css',
})
export class ReceipeinfodialogComponent {
  ID = 0;
  foodImageUrl: string = '';
  IsEdit = false;
  Status = false;
  UserReview = false;
  IsReceipesInfoView = false;
  UserStatus = '';
  userID = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  Name = '';
  Description = '';
  Ingredients = '';
  CookingSteps = '';
  Categorys = '';
  commentHelp = false;
  Comment = '';
  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _localStorage: localStorageSession,
    public serviceService: UserService
  ) {
    this.userID = this._localStorage.getItem('User-Id');
    this.ID = data.id;
    this.Name = data.name;
    this.Description = data.description;
    this.Ingredients = data.ingredients;
    this.CookingSteps = data.cookingSteps;
    this.Categorys = data.category;
    this.Status = data.isActive;
    this.IsEdit = true;
    this.UserReview = true;
    // debugger;
  }

  ngOnInit() {}

  handleClear() {
    $('#nameHelp').hide();
    $('#descriptionHelp').hide();
    $('#ingredientsHelp').hide();
    $('#cookingstepsHelp').hide();
    $('#categoryHelp').hide();
    $('#commentHelp').hide();
    this.IsEdit = false;

    $('#name').val('');
    $('#description').val('');
    $('#ingredients').val('');
    $('#cookingsteps').val('');
    $('#category').val('');
    $('#comment').val('');

    $('#keyword').val('');
    this.Status = false;

    this.UserReview = false;
    // this.GetReceipesDetailList();
    this.IsReceipesInfoView = false;
    this.Comment = '';
    this.dialog.closeAll();
  }

  handleStatus(status: any) {
    // debugger;
    this.UserStatus = status ? 'LIKE' : 'UNLIKE';
    $('#userstatus').val(status ? 'LIKE' : 'UNLIKE');
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  handleValue(event: any) {
    this.Comment = event.target.value;
  }

  handleSubmit() {
    // debugger;
    this.commentHelp = false;

    if (this.Comment === '') {
      // $('#commentHelp').show();
      this.commentHelp = true;
      return;
    }

    let data = {
      receipeId: this.ID,
      userId: this.userID,
      comment: this.Comment,
      status: this.UserStatus,
      createdDate: new Date(),
    };

    this.serviceService.AddUserReview(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Add Review Successfully');
        this.UserReview = false;
        this.handleClear();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }
}
