import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inside-header',
  standalone: false,
  templateUrl: './inside-header.component.html',
  styleUrl: './inside-header.component.css'
})
export class InsideHeaderComponent {
  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/']); 
 
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('username');
    }// Navigates to home on logout
  }

