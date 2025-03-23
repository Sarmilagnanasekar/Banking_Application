import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-services',
  standalone:false,
  templateUrl: './loan-services.component.html',
  styleUrls: ['./loan-services.component.css']
})
export class LoanServicesComponent {
  constructor(private router: Router) {}
  
  loans = [
    { 
      name: 'Home Loan', 
      logo: 'assets/home-loan.png', 
      description: 'Secure your dream home with low-interest home loans. Senior citizens enjoy a special 7% interest rate, while others can avail loans at 8% with flexible repayment plans.'
    },
    { 
      name: 'Personal Loan', 
      logo: 'assets/personal-loan.png', 
      description: 'Quick personal loans with minimal documentation. Seniors benefit from a reduced 9% interest rate, while general applicants get a 10% rate with fast approvals.'
    },
    { 
      name: 'Car Loan', 
      logo: 'assets/car-loan.png', 
      description: 'Drive your dream car with easy car loan options. Special 7.5% interest for senior citizens, standard 9% for others, and up to 7-year flexible repayment terms.'
    },
    { 
      name: 'Education Loan', 
      logo: 'assets/education-loan.png', 
      description: 'Invest in education with flexible student loans. Seniors co-signing for their wards enjoy a 6.5% interest rate, while others get an 8% rate with tax benefits.'
    },
    { 
      name: 'Business Loan', 
      logo: 'assets/business-loan.png', 
      description: 'Expand your business with customized loan solutions. Senior entrepreneurs get loans at 8% interest, while others receive competitive 9.5% rates with priority approvals.'
    }
  ];

  applyNow() {
    this.router.navigate(['/login']);
  }
}