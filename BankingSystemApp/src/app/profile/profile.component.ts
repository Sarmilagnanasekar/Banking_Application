import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../account.service';
import { LoanService } from '../loan.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Transaction } from '../transaction';
import { Account } from '../account';

@Component({
  selector: 'app-profile',
  standalone:false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  account: any = { id: 0, balance: 0, accountType: "No Account Found" };
  transactions: Transaction[] = [];
  loan: any = { amount: 0, status: "No Loan" };
  amount: number = 0;
  loading: boolean = false;
  apiUrl: string = "http://localhost:8080/api";
  transactionsPage: number = 0;
  totalPages: number = 0;
  page:number=1;


  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private loanService: LoanService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      let userId = localStorage.getItem('user');
      console.log(userId);
    }
    const userId = localStorage.getItem("userId");
    if (userId) {
      this.http.get(`${this.apiUrl}/users/profile/${userId}`).subscribe(
        (data: any) => {
          this.user = data;
          this.fetchAccountDetails();
          this.fetchLoanDetails();
        },
        (error) => console.error("❌ Error fetching user:", error)
      );
    }
  }
  fetchLoanDetails() {
    console.log("Fetching loan details for user ID:", this.user?.userId);
    
    if (!this.user || !this.user.userId) {
      alert("User ID is invalid.");
      return;
    }
  
    this.loanService.getLoanByUserId(this.user.userId).subscribe(
      (data) => {
        console.log("Loan details fetched successfully:", data);
        this.loan = data;
        console.log("this.loan.loanAmount : " + this.loan[0].loanAmount);
        console.log("this.loan.status : " + this.loan[0].status);
      },
      (error) => {
        console.error("❌ Error fetching loan:", error);
        alert("Failed to fetch loan details. Please try again later.");
      }
    );
  }
  
  

  fetchAccountDetails() {
    if (!this.user.email) return;
  
    this.http.get<Account>(`${this.apiUrl}/accounts/email/${encodeURIComponent(this.user.email)}`).subscribe(

      (data: any) => {
        console.log("✅ Account Data:", data);
        if (data && data.accountId) { 
          this.account = data;
          this.account.id = data.accountId;  // Ensure ID is assigned
          this.fetchTransactions(); // Now call fetchTransactions safely
        } else {
          console.warn("⚠️ Account details not found!");
        }
      },
      (error) => {
        console.error("❌ Error fetching account details:", error);
        alert("Failed to load account details");
      }
    );
  }
  

  fetchTransactions() {
    this.http.get<Transaction[]>(`${this.apiUrl}/transactions/get/${this.account.id}`).subscribe(
      (data) => {
        this.transactions = data;
        this.cdr.detectChanges();
      },
      (error) => console.error("❌ Error fetching transactions:", error)
    );
  }

  performTransaction(type: 'Credit' | 'Debit', description: string) {
    if (this.amount <= 0 || !this.account.id || !this.user.userId) {
      alert("Invalid transaction details");
      return;
    }
    const transactionData = {
      account: { accountId: this.account.id },
      user: { userId: this.user.userId },
      amount: this.amount,
      transactionType: type,
      description,
      status: "SUCCESS"
    };
    this.http.post(`${this.apiUrl}/transactions/create`, transactionData).subscribe(
      () => {
        alert(`${type} successful!`);
        this.fetchAccountDetails();
        this.fetchTransactions();
        this.amount = 0;
      },
      (error) => alert(`Transaction failed: ${error.error}`)
    );
  }

  deposit() {
    this.performTransaction("Credit", "Bank Deposit");
  }

  withdraw() {
    if (this.amount > this.account.balance) {
      alert("Insufficient funds!");
      return;
    }
    this.performTransaction("Debit", "ATM Withdrawal");
  }

  transfer() {
    const recipientEmail = prompt("Enter recipient email:");
  
    if (!recipientEmail || !recipientEmail.trim()) {
      alert("⚠️ Recipient email cannot be empty!");
      return;
    }
  
    if (!this.amount || this.amount <= 0 || this.amount > this.account.balance) {
      alert("⚠️ Invalid transfer amount!");
      return;
    }
  
    this.http.post(`${this.apiUrl}/accounts/transfer`, {
      senderEmail: this.user.email,
      recipientEmail: recipientEmail.trim(),
      amount: this.amount
    }).subscribe(
      () => {
        alert("✅ Transfer successful!");
        this.performTransaction("Debit", "Bank Transfer");// Manually add transaction
        this.fetchAccountDetails();
        this.fetchTransactions();
      },
      (error) => {
        console.error("❌ Transfer error:", error);
        alert(`❌ Transfer failed! ${error.error?.message || "Please try again."}`);
      }
    );
  }
  submitTransaction(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
  

  
}  