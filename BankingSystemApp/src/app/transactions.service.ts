import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Transaction } from './transaction';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8080/api/transactions'; // Backend API URL

  constructor(private http: HttpClient) { }
  getAllTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  getUserById(userId: number) {
    return this.http.get<any>(`http://localhost:8080/api/users/profile/${userId}`);
  }

  getTransactions(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/get/${accountId}`)
      .pipe(
        catchError((error) => {
          console.error("❌ Error fetching transactions:", error);
          return throwError(() => new Error("Error fetching transactions"));
        })
      );
  }
}
