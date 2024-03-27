import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { localStorageSession } from '../../shared/localStorage';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css',
})
export class UserdashboardComponent {
  UserName = '';
  constructor(
    private router: Router,
    private _localStorage: localStorageSession
  ) {
    this.UserName = this._localStorage.getItem('User-Email');
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this._localStorage.getItem('User-Token') === null) {
      this.router.navigate(['']);
    }
  }

  handleNavHome() {
    console.log('Navigate To Home');
    this.router.navigate(['/userdashboard/home']);
  }

  handleNavProfile() {
    console.log('Navigate To Profile');
    this.router.navigate(['/userdashboard/profile']);
  }

  

  handleNavReview() {
    this.router.navigate(['/userdashboard/review']);
  }

  handleNavSignOut() {
    console.log('Navigate To SignOut');
    this._localStorage.removeItem('User-Id');
    this._localStorage.removeItem('User-Token');
    this._localStorage.removeItem('User-Email');
    this.router.navigate(['']);
  }
}
