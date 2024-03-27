import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.component.html',
  styleUrl: './welcomepage.component.css',
})
export class WelcomepageComponent {
  constructor(private router: Router) {}

  handleNavSignIn() {
    this.router.navigate(['/signIn']);
  }

  handleNavSignUp() {
    this.router.navigate(['/signup']);
  }
}
