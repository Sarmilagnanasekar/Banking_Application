import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private baseUrl = 'http://localhost:8080/api/loans'; // Update the URL as needed

  constructor(private http: HttpClient) {}

  getAllLoans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  applyLoan(userId: number, loanData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/apply?userId=${userId}`, loanData);
  }

  approveLoan(loanId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/approve/${loanId}`, {});
  }

  rejectLoan(loanId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/reject/${loanId}`, {});
  }

  deleteLoan(loanId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${loanId}`);
  }
  getLoanByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/${userId}`);
  }
  
}
