import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { UserService } from '../../services/user.service';
import { localStorageSession } from '../../shared/localStorage';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import { ReceipeinfodialogComponent } from '../receipeinfodialog/receipeinfodialog.component';
@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.css',
})
export class UserhomeComponent {
 
  List: any[] = [];
  userID = 0;
  ID = 0;
  IsEdit = false;
  Status = false;
  UserStatus = '';
  UserReview = false;
  IsReceipesInfoView = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public serviceService: UserService,
    private businessService: AdminService,
    private _localStorage: localStorageSession,
    private _snackBar: MatSnackBar
  ) {
    this.userID = this._localStorage.getItem('User-Id');
  }

  ngOnInit(): void {
    // debugger;
    this.GetReceipesDetailList();
  }

  GetReceipesDetailList() {
    this.serviceService.GetReceipesDetailList().subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.List = result;
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  async handleCopy(data: any) {
    // debugger;
    // await this.handleVisibility();

    this.ID = data.id;
    $('#name').text(data.name);
    $('#description').text(data.description);
    $('#ingredients').text(data.ingredients);
    $('#cookingsteps').text(data.cookingSteps);
    $('#categorys').text(data.category);
    this.Status = data.isActive;
    this.IsEdit = true;
    this.UserReview = true;

    const dialogRef = this.dialog.open(ReceipeinfodialogComponent, {
      width: '400px', // specify width if needed
      data: data,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('Dialog closed with result:', result);
    });
  }

  handleVisibility() {
    this.IsReceipesInfoView = true;
  }

  handleDelete(id: any) {}

  handleSubmit() {
    $('#commentHelp').hide();
    if ($('#comment').val() === '') {
      $('#commentHelp').show();
      return;
    }

    let data = {
      receipeId: this.ID,
      userId: this.userID,
      comment: $('#comment').val(),
      status: $('#userstatus').val() === '' ? null : $('#userstatus').val(),
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

  handleCategorySearch() {
    if ($('#category').val() === '') {
      this.GetReceipesDetailList();
      return;
    }

    this.serviceService.GetReceipesByCategory($('#category').val()).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.List = result;
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleSearchClear() {
    $('#category').val('');
    this.GetReceipesDetailList();
  }

  handleSearch() {
    if ($('#keyword').val() === '') {
      this.GetReceipesDetailList();
      return;
    }

    this.serviceService.GetReceipesByKeyword($('#keyword').val()).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.List = result;
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

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
    this.GetReceipesDetailList();
    this.IsReceipesInfoView = false;
  }

  handleStatus(status: any) {
    // debugger;
    this.UserStatus = status;
    $('#userstatus').val(status ? 'LIKE' : 'UNLIKE');
  }
}
