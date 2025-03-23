import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginRequest = { email: '', password: '' };
  errorMessage: string = '';
 
  currentImage = 1;
  quotes = [
    `"Your trusted partner in financial success."`,
    `"Banking made simple and secure."`,
    `"Smart banking for a smarter future."`,
    `"We value your dreams and investments."`,
    `"Every penny counts, and so do you."`
  ];
  currentQuote = this.quotes[0];

  constructor(private http: HttpClient, private router: Router) {
    // Start Image & Quote Slideshow
    setInterval(() => {
      this.currentImage = (this.currentImage % 5) + 1;
      this.currentQuote = this.quotes[this.currentImage - 1];
    }, 3000);
  }

  onSubmit(): void {
    if (!this.loginRequest.email || !this.loginRequest.password) {
      Swal.fire('Error', 'Please fill in all fields', 'error');
      return;
    }
  
    this.http.post<any>('http://localhost:8080/api/users/login', this.loginRequest)
      .subscribe({
        next: (response) => {
          console.log('Login Response:', response); // 🔍 Debugging step
          if (response && response.id) {
            Swal.fire('Success', 'Login successful!', 'success').then(() => {
              const userId = localStorage.setItem("userId",response.id);
              this.router.navigate([`/profile/${response.id}`]); // Redirect to profile
            });
          } else {
            Swal.fire('Error', 'Invalid response from server', 'error');
          }
        },
        error: (err) => {
          console.error('Login Error:', err); // Log the error
          Swal.fire('Error', err.status === 401 ? 'Invalid email or password' : 'An error occurred. Please try again later.', 'error');
        }
      });
  }
  
}  