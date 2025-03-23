import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone:false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  currentTime: string = '';  // Variable to store the current time
  private timeInterval: any; // Variable to store the interval reference for time update

  constructor(private router: Router) {}

  // Navigate to Login page
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  // Navigate to Sign Up page
  navigateToSignUp() {
    this.router.navigate(['/register']);
  }

  // Navigate to Admin Login page
  navigateToAdminLogin() {
    this.router.navigate(['/admin-login']);
  }
}
