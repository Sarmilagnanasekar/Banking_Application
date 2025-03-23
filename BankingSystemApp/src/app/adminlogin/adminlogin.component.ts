import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone:false,
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isShaking: boolean = false;

  constructor(private router: Router) {}

  login() {
    const defaultUsername = 'admin';
    const defaultPassword = 'admin@123';

    if (this.username === defaultUsername && this.password === defaultPassword) {
      localStorage.setItem('adminLoggedIn', 'true'); // Store login session
      this.router.navigate(['/admindashboard']); // Redirect
    } else {
      this.errorMessage = 'Invalid username or password';
      this.triggerShakeAnimation();
    }
  }
  logout() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('username');
  }
  triggerShakeAnimation() {
    this.isShaking = true;
    setTimeout(() => {
      this.isShaking = false;
    }, 500);
  }
}
