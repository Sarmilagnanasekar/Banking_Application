import { Component, OnInit } from '@angular/core';
import { LoanService } from '../loan.service';


@Component({
  selector: 'app-loan',
  standalone:false,
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  loans: any[] = [];
  userId: number = 0;
  loanData = {
    loanAmount: 0,
    interestRate: 0,
    tenure: 0,
    termMonths: 0,
    loanType: ''
  };

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans() {
    this.loanService.getAllLoans().subscribe(data => this.loans = data);
  }

  applyLoan() {
    if (!this.userId) {
      alert('Enter a valid User ID');
      return;
    }
    this.loanService.applyLoan(this.userId, this.loanData).subscribe(() => {
      alert('Loan applied successfully!');
      this.loadLoans();
    });
  }

  approveLoan(loanId: number) {
    this.loanService.approveLoan(loanId).subscribe(() => this.loadLoans());
  }

  rejectLoan(loanId: number) {
    this.loanService.rejectLoan(loanId).subscribe(() => this.loadLoans());
  }

  deleteLoan(loanId: number) {
    this.loanService.deleteLoan(loanId).subscribe(() => this.loadLoans());
  }
}
