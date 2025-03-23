import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  standalone:false,
  templateUrl: './register.Component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { name: '', email: '', password: '', confirmPassword: '' };
  leftReviews = [
    { image: 'assets/person1.png', text: 'Amazing banking experience! I love the customer service and user-friendly interface.' },
    { image: 'assets/person2.png', text: 'This bank offers great loan services, and I got my loan approved in no time!' },
    { image: 'assets/person3.png', text: 'The mobile banking app is smooth and hassle-free. Highly recommend!' },
    { image: 'assets/person4.png', text: 'Secure transactions and great support. Best banking experience I have had so far.' },
    { image: 'assets/person5.png', text: 'I love how easy it is to manage my accounts and investments with this bank.' }
  ];
  rightReviews = [
    { image: 'assets/person6.png', text: 'Excellent interest rates on savings accounts and fixed deposits!' },
    { image: 'assets/person7.png', text: 'Their customer support is always responsive and helpful.' },
    { image: 'assets/person8.png', text: 'Best bank for business loans. They made my application process seamless.' },
    { image: 'assets/person9.png', text: 'Highly secure and trustworthy. I feel confident banking here.' },
    { image: 'assets/person10.png', text: 'User-friendly app, quick transactions, and low service fees. Love it!' }
  ];

  constructor(private router: Router, private http: HttpClient) {}

  registerUser() {
    // Check if passwords match before sending request
    if (this.user.password !== this.user.confirmPassword) {
      Swal.fire('Error', 'Passwords do not match!', 'error');
      return;
    }
  
    // Send only name, email, and password to the backend
    this.http.post('http://localhost:8080/api/users/register', {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })
      .subscribe(
        (response: any) => {
          Swal.fire('Success', 'Registration successful!', 'success').then(() => {
            this.router.navigate(['/login']);
          });
        },
        (error) => {
          Swal.fire('Error', error.error.message || 'Registration failed!', 'error');
        }
      );
  }
  
  
}