import { Component } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { localStorageSession } from '../../shared/localStorage';
import { AdminService } from '../../services/admin.service';
@Component({
  selector: 'app-userhalllist',
  templateUrl: './userreview.component.html',
  styleUrl: './userreview.component.css',
})
export class UserReviewComponent {
  Id = 0;
 
  UserID = 0;
  Status = null;
  IsDisable = true;
  List: any[] = [];
  ReceipesList: any[] = [];
  FinalList: any[] = [];
  ReceipesID = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  IsEdit = false;
  constructor(
    private router: Router,
    private serviceService: UserService,
    private _localStorage: localStorageSession,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private businessService: AdminService
  ) {}

  ngOnInit() {
    this.GetReceipesDetailList();
    this.GetUserReviewList();
  }

  async GetUserReviewList() {
    await this.serviceService.GetUserReviewList().subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.List = result;
      },
      error: (error: any) => {
        console.log('Error : ', error);
      },
    });
  }

  async GetReceipesDetailList() {
    await this.serviceService.GetReceipesDetailList().subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.ReceipesList = result;
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

 

  handleEditComment(data: any) {
    $('#comment').val(data.comment);
    $('#status').val(data.status);
    $('#receipName').text(data.receipname);
    this.ReceipesID = data.receipeId;
    this.IsEdit = true;
    this.Id = data.id;
    this.IsDisable = false;
    // debugger;
  }

  handleDeleteComment(id: any) {
    this.serviceService.DeleteUserReview(id).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Delete Review Successfully');
        this.GetUserReviewList();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
      },
    });
  }

  handleStatus(status: any) {
    this.Status = status;
    $('#status').val(status ? 'LIKE' : 'UNLIKE');
  }

  handleSubmit() {
    this.handleEdit();
  }

  handleEdit() {
    $('#commentHelp').hide();
    let Value = false;
    if ($('#comment').val() === '') {
      $('#commentHelp').show();
      Value = true;
    }

    if (Value) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      id: this.Id,
      comment: $('#comment').val(),
      status: $('#status').val(),

      createdDate: new Date(),
      receipeId: this.ReceipesID,
      userId: this.UserID,
    };
    this.serviceService.UpdateUserReview(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Update Review Successfully');
        this.GetUserReviewList();
        this.handleClear();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something Went wrong');
      },
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  handleClear() {
    $('#comment').val('');
    $('#status').val('');

    this.IsEdit = false;
    this.Id = 0;
    this.IsDisable = true;
  }
}
