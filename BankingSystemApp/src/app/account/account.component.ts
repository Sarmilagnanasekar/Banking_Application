import { Component, OnInit } from '@angular/core';
 // Ensure the correct path
import { HttpErrorResponse } from '@angular/common/http';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  standalone:false,
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  
  accounts: any[] = [];
  account: any = {}; // For creating/updating accounts
  selectedAccount: any = {}; // ✅ Store selected account for editing
  isEditing: boolean = false; 

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  // ✅ Fetch accounts
  loadAccounts() {
    this.accountService.getAccounts().subscribe(
      (data) => {
        this.accounts = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching accounts:', error.message);
      }
    );
  }

  // ✅ Create an account
  createAccount() {
    this.accountService.createAccount(this.account).subscribe(
      () => {
        alert('Account created successfully');
        this.loadAccounts(); // Reload accounts
      },
      (error: HttpErrorResponse) => {
        console.error('Error creating account:', error.message);
      }
    );
  }

  // ✅ Update an account
  updateAccount(account: any) {
    this.accountService.updateAccount(account.accountId, account).subscribe(
      () => {
        alert('Account updated successfully');
        this.loadAccounts();
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating account:', error.message);
      }
    );
  }
  editAccount(account: any) {
    this.selectedAccount = { ...account }; // Store a copy of the account
    this.isEditing = true; // Enable editing mode
  }
  

  // ✅ Delete an account
  deleteAccount(accountId: number) {
    this.accountService.deleteAccount(accountId).subscribe(
      () => {
        alert('Account deleted successfully');
        this.loadAccounts();
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting account:', error.message);
      }
    );
  }
}
