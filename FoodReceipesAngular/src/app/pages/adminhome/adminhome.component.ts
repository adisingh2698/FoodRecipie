import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import { localStorageSession } from '../../shared/localStorage';
@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css',
})
export class AdminhomeComponent {
  tourLocationList: any[] = [];
  List: any[] = [];
  userID = 0;
  ID = 0;
  IsEdit = false;
  Status = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public businessService: AdminService,
    private _snackBar: MatSnackBar,
    private _localStorage: localStorageSession
  ) {
    this.userID = Number(this._localStorage.getItem('Admin-Id'));
  }

  ngOnInit(): void {
    this.GetReceipesDetailList();
  }

  GetReceipesDetailList() {
    this.businessService.GetReceipesDetailList().subscribe((result: any) => {
      console.log('Result : ', result);
      this.List = result;
    });
  }

  handleDelete(id: number) {
    this.businessService.DeleteReceipesDetailL(id).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Delete Receipes Detail Successfully');
        this.GetReceipesDetailList();
        this.handleClear();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleNevigateTour() {
    this.router.navigate(['/admindashboard/adminMovie/0/false']);
  }

  handleCopy(data: any) {
    this.ID = data.id;
    $('#name').val(data.name);
    $('#description').val(data.description);
    $('#ingredients').val(data.ingredients);
    $('#cookingsteps').val(data.cookingSteps);
    $('#category').val(data.category);
    $('#imageUrl').val(data.imageUrl);
    this.Status = data.isActive;
    this.IsEdit = true;
    // debugger;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  handleSubmit() {
    if (this.IsEdit) {
      this.handleEdit();
    } else {
      this.handleAdd();
    }
  }

  handleAdd() {
    console.log('Status : ', $('#status').is(':checked'));
    if (this.handleValidation()) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      userID: this.userID,
      name: $('#name').val(),
      description: $('#description').val(),
      ingredients: $('#ingredients').val(),
      cookingSteps: $('#cookingsteps').val(),
      imageUrl: $('#imageUrl').val(),
      category: $('#category').val(),
      isActive: this.Status,
    };

    this.businessService.AddReceipesDetail(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Add Receipes Detail Successfully');
        this.GetReceipesDetailList();
        this.handleClear();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleStatus(event: any) {
    console.log('Event : ', event.target.checked);
    this.Status = event.target.checked;
  }

  handleEdit() {
    if (this.handleValidation()) {
      this.openSnackBar('Please Enter Required Field');
      return;
    }

    let data = {
      id: this.ID,
      userID: this.userID,
      name: $('#name').val(),
      description: $('#description').val(),
      ingredients: $('#ingredients').val(),
      cookingSteps: $('#cookingsteps').val(),
      imageUrl: $('#imageUrl').val(),
      category: $('#category').val(),
      isActive: this.Status,
    };

    this.businessService.UpdateReceipesDetail(data).subscribe({
      next: (result: any) => {
        console.log('Result : ', result);
        this.openSnackBar('Update Receipes Detail Successfully');
        this.GetReceipesDetailList();
        this.handleClear();
      },
      error: (error: any) => {
        console.log('Error : ', error);
        this.openSnackBar('Something went wrong');
      },
    });
  }

  handleValidation() {
    $('#nameHelp').hide();
    $('#descriptionHelp').hide();
    $('#ingredientsHelp').hide();
    $('#cookingstepsHelp').hide();
    $('#categoryHelp').hide();
    $('#imageUrlHelp').hide();

    let Value = false;
    if ($('#name').val() === '') {
      $('#nameHelp').show();
      Value = true;
    }
    if ($('#description').val() === '') {
      $('#descriptionHelp').show();
      Value = true;
    }
    if ($('#ingredients').val() === '') {
      $('#ingredientsHelp').show();
      Value = true;
    }
    if ($('#cookingsteps').val() === '') {
      $('#cookingstepsHelp').show();
      Value = true;
    }
    if ($('#category').val() === '') {
      $('#categoryHelp').show();
      Value = true;
    }
    if ($('#imageUrl').val() === '') {
      $('#imageUrlHelp').show();
      Value = true;
    }

    return Value;
  }

  handleClear() {
    $('#nameHelp').hide();
    $('#descriptionHelp').hide();
    $('#ingredientsHelp').hide();
    $('#cookingstepsHelp').hide();
    $('#imageUrlHelp').hide();
    $('#categoryHelp').hide();
    this.IsEdit = false;

    $('#name').val('');
    $('#description').val('');
    $('#ingredients').val('');
    $('#cookingsteps').val('');
    $('#imageUrl').val('');
    $('#category').val('');
    this.Status = false;
  }
}
