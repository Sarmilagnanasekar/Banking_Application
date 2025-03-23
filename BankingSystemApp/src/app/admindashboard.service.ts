import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmindashboardService {
  private apiUrl = 'http://localhost:8080/api'; // Update with the actual backend URL if necessary

  constructor(private http: HttpClient) { }

  // Fetch all users
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  // Fetch all accounts
  getAllAccounts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts`);
  }

  // Fetch all transactions
  getAllTransactions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/transactions`);
  }

  // Fetch suspicious transactions
  getSuspiciousTransactions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/transactions/suspicious`);
  }

  blockUser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/users/block/${id}`, {});
  }

  unblockUser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/users/unblock/${id}`, {});
  }
// Updated AdmindashboardService (for loans)
getAllLoans(): Observable<any> {
  return this.http.get(`${this.apiUrl}/loans`);
}

approveLoan(loanId: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/loans/approve/${loanId}`, {});
}

rejectLoan(loanId: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/loans/reject/${loanId}`, {});
}


  // Generate report
  generateReport(): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/report`);
  }
}
