import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-savings-schemes',
  standalone:false,
  templateUrl: './savings-schemes.component.html',
  styleUrls: ['./savings-schemes.component.css'],
  animations: [
    trigger('fadeInDelay', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.8s ease-in-out',
          keyframes([
            style({ opacity: 0, transform: 'translateY(20px)', offset: 0 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
          ])
        )
      ])
    ])
  ]
})
export class SavingsSchemesComponent {
  constructor(private router: Router) {}
  
  savingsSchemes = [
    { 
      name: 'Savings Account', 
      logo: 'assets/savings-account.png', 
      description: 'A savings account helps you manage your money efficiently. It offers security, interest earnings, and easy access to funds. You can deposit and withdraw money at your convenience, making it ideal for everyday banking. Our savings account comes with free online banking, ATM access, and zero balance options. Enjoy exclusive features like automated bill payments, mobile banking, and reward points on transactions. Whether saving for an emergency or future investments, our account provides a solid foundation for financial planning. Open one today and take the first step towards smart money management!'
    },
    { 
      name: 'Current Account', 
      logo: 'assets/current-account.png', 
      description: 'A current account is essential for businesses and professionals who need unlimited transactions. It enables seamless financial operations with features like overdraft facilities, quick money transfers, and easy fund management. Our current account includes multi-city cheque access, free NEFT/RTGS, and cash deposit flexibility. Stay ahead with real-time banking solutions, 24/7 customer support, and business-friendly banking features. Perfect for entrepreneurs and corporates, our current account ensures smooth financial transactions without restrictions. Open one today and experience hassle-free banking for your business!'
    },
    { 
      name: 'Fixed Deposit', 
      logo: 'assets/fixed-deposit.png', 
      description: 'A fixed deposit (FD) is a reliable investment option that provides guaranteed returns. Lock in your savings for a fixed tenure and earn high interest rates. Our FDs offer flexible tenures, loan options against FD, and automatic renewal. With zero market risks, this is the safest way to grow your wealth. Choose from monthly or quarterly interest payouts to suit your needs. Secure your future with our high-return fixed deposit plans today!'
    },
    { 
      name: 'Recurring Deposit', 
      logo: 'assets/recurring-deposit.png', 
      description: 'A recurring deposit (RD) helps you save systematically every month while earning attractive interest rates. Ideal for salaried individuals and students, RDs encourage disciplined saving. Our RD plans come with flexible deposit amounts, automatic deductions, and high-interest benefits. Build a strong financial future with small monthly savings. Start your recurring deposit journey today and watch your savings grow over time!'
    }
  ];

  applyNow(schemeName: string) {
    if (schemeName === 'Savings Account' || schemeName === 'Current Account') {
      this.router.navigate(['/register']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}