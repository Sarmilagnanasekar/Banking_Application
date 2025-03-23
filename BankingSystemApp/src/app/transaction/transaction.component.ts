import { Component, OnInit } from '@angular/core';


import { TransactionService } from '../transactions.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-transaction',
  standalone:false,
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  loading: boolean = false;
  searchQuery: string = '';
  selectedTransaction: any = null;
  account: { accountId: number } | null = null;
  currentPage: number = 1;
itemsPerPage: number = 10; 
page:number=1;// Number of transactions per page


  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.loading = true;
    
    if (this.account && this.account.accountId) {
      // Fetch transactions for a specific account
      this.transactionService.getTransactions(this.account.accountId).subscribe(
        (data) => {
          console.log("📌 Transactions Data:", data);
          this.transactions = data;
          this.filteredTransactions = data;
          this.loading = false;
        },
        (error) => {
          console.error("❌ Error fetching transactions:", error);
          this.loading = false;
        }
      );
    } else {
      // Fetch all transactions
      this.transactionService.getAllTransactions().subscribe(
        (data) => {
          this.transactions = data;
          this.filteredTransactions = data;
          this.loading = false;
        },
        (error) => {
          console.error("❌ Error fetching transactions:", error);
          this.loading = false;
        }
      );
    }
  }
  
  searchTransactions(): void {
    if (!this.searchQuery) {
      this.filteredTransactions = [...this.transactions];
    } else {
      this.filteredTransactions = this.transactions.filter(transaction =>
        transaction.account?.accountId.toString().includes(this.searchQuery) ||
        transaction.user?.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        transaction.transactionType.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        transaction.status.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  
  
    console.log("Filtered Transactions:", this.filteredTransactions);
    this.currentPage = 1; // Reset pagination to first page
  }
  

  viewTransactionDetails(transaction: any): void {
    this.selectedTransaction = transaction;
  }

  closeModal(): void {
    this.selectedTransaction = null;
  }

  // exportToCSV(): void {
  //   const worksheet = XLSX.utils.json_to_sheet(this.transactions);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  //   FileSaver.saveAs(data, 'transactions.xlsx');
  // }
  exportToCSV(): void {
    const headers = ['Id', 'User Name', 'Account number', 'Amount', 'Transaction Type', 'Description', 'Date', 'Status'];
    const rows = this.transactions.map(t => [
      t.transactionId,
      t.user?.name,
      t.account?.accountId,
      t.amount,
      t.transactionType,
      t.description,
      t.timestamp,
      t.status
    ]);
  
    let csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  

  exportToPDF(): void {
    const doc = new jsPDF();
    doc.text('Transaction History', 20, 10);
    autoTable(doc, {
      head: [['Id','User Name','Account number', 'Amount','Transaction Type','Description', 'Date', 'Status']],
      body: this.transactions.map(t => [t.transactionId,t.user?.name,t.account?.accountId , t.amount,t.transactionType,t.description, t.timestamp, t.status]),
    });
    doc.save('transactions.pdf');
  }
}
