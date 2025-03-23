import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getUserProfile(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/profile/${userId}`).pipe(
      catchError(error => this.handleError(error, "Failed to load user details"))
    );
  }

  getAccountByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts/email/${encodeURIComponent(email)}`).pipe(
      catchError(error => this.handleError(error, "Failed to load account details"))
    );
  }

  deposit(accountId: number, amount: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/accounts/${accountId}/deposit?amount=${amount}`, {}).pipe(
      catchError(error => this.handleError(error, "Deposit failed!"))
    );
  }

  withdraw(accountId: number, amount: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/accounts/${accountId}/withdraw?amount=${amount}`, {}).pipe(
      catchError(error => this.handleError(error, "Withdrawal failed!"))
    );
  }

  transfer(senderEmail: string, recipientEmail: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts/transfer`, { senderEmail, recipientEmail, amount }).pipe(
      catchError(error => this.handleError(error, "Transfer failed!"))
    );
  }

  getTransactions(accountId: number, page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/transactions/${accountId}?page=${page}&size=${size}`).pipe(
      catchError(error => this.handleError(error, "Error fetching transactions"))
    );
  }

  downloadTransactions(accountId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/transactions/download/${accountId}`, { responseType: 'blob' }).pipe(
      catchError(error => this.handleError(error, "Error downloading transactions"))
    );
  }

  private handleError(error: any, message: string) {
    console.error(message, error);
    return throwError(() => new Error(message));
  }
 // ✅ Fetch all accounts
 getAccounts(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/accounts/all`).pipe(
    catchError(error => this.handleError(error, "Failed to fetch accounts"))
  );
}

// ✅ Create a new account
createAccount(account: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/accounts/create`, account).pipe(
    catchError(error => this.handleError(error, "Failed to create account"))
  );
}

// ✅ Update an account
updateAccount(accountId: number, account: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/accounts/update/${accountId}`, account).pipe(
    catchError(error => this.handleError(error, "Failed to update account"))
  );
}

// ✅ Delete an account
deleteAccount(accountId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/accounts/delete/${accountId}`).pipe(
    catchError(error => this.handleError(error, "Failed to delete account"))
  );
}

  // 🔹 **Get User by ID**
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/profile/${userId}`);
  }
  getAccountsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/accounts/${userId}`);
  }

}
