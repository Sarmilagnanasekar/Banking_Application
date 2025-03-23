import { Component, OnInit } from '@angular/core';
import { AdmindashboardService } from '../admindashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  accounts: any[] = [];  // Initialize accounts array
  transactions: any[] = [];
  users: any[] = [];
  loans: any[] = [];

  constructor(private adminService: AdmindashboardService) { }

  ngOnInit(): void {
    this.getAllAccounts();  // Fetch all accounts when the component initializes
    this.getAllUsers();  // Fetch all users
    this.getAllTransactions();  // Fetch all transactions
    this.getAllLoans();  // Fetch all loans
  }

  getAllAccounts(): void {
    this.adminService.getAllAccounts().subscribe(
      (accounts) => {
        console.log('Accounts fetched:', accounts);
        this.accounts = accounts;  // Assign fetched accounts to the array
      },
      (error) => {
        console.error('Error fetching accounts:', error);
      }
    );
  }

  getAllUsers(): void {
    this.adminService.getAllUsers().subscribe(
      (users) => {
        this.users = users;  // Assign fetched users to the array
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  getAllTransactions(): void {
    this.adminService.getAllTransactions().subscribe(
      (transactions) => {
        this.transactions = transactions;  // Assign fetched transactions to the array
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }

  getAllLoans(): void {
    this.adminService.getAllLoans().subscribe(
      (loans) => {
        this.loans = loans;  // Assign fetched loans to the array
      },
      (error) => {
        console.error('Error fetching loans:', error);
      }
    );
  }

  // Block user account
  blockUser(userId: number): void {
    if (userId) {
      this.adminService.blockUser(userId).subscribe(
        (response) => {
          console.log('User blocked:', response);
          this.getAllUsers();  // Refresh users list after blocking
        },
        (error) => {
          console.error('Error blocking user:', error);
        }
      );
    } else {
      console.error('User ID is not valid:', userId);
    }
  }
  
  // Unblock user account
  unblockUser(userId: number): void {
    if (userId) {
      this.adminService.unblockUser(userId).subscribe(
        (response) => {
          console.log('User unblocked:', response);
          this.getAllUsers();  // Refresh users list after unblocking
        },
        (error) => {
          console.error('Error unblocking user:', error);
        }
      );
    } else {
      console.error('User ID is not valid:', userId);
    }
  }
  

  // Approve loan application
  approveLoan(loanId: string): void {
    this.adminService.approveLoan(loanId).subscribe(
      (response) => {
        console.log('Loan approved:', response);
        this.getAllLoans();  // Refresh loans list after approval
      },
      (error) => {
        console.error('Error approving loan:', error);
      }
    );
  }

  // Reject loan application
  rejectLoan(loanId: string): void {
    this.adminService.rejectLoan(loanId).subscribe(
      (response) => {
        console.log('Loan rejected:', response);
        this.getAllLoans();  // Refresh loans list after rejection
      },
      (error) => {
        console.error('Error rejecting loan:', error);
      }
    );
  }

  // Generate report
  generateReport(): void {
    this.adminService.generateReport().subscribe(
      (report) => {
        console.log('Report generated:', report);
      },
      (error) => {
        console.error('Error generating report:', error);
      }
    );
  }
}
