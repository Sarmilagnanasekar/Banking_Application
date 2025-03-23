import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = 'http://localhost:8080/api/users'; // Spring Boot endpoint

  constructor(private http: HttpClient) { }

  // 🔹 **Login Method**
  login(emailId: string, employeePassword: string): Observable<any> {
    const loginRequest = { emailId, employeePassword };
    return this.http.post<any>(`${this.api}/users/login`, loginRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
  // Block a user
  blockUser(id: number): Observable<string> {
    return this.http.put(`${this.api}/block/${id}`, {}, { responseType: 'text' });
  }

  // Unblock a user
  unblockUser(id: number): Observable<string> {
    return this.http.put(`${this.api}/unblock/${id}`, {}, { responseType: 'text' });
  }

 
  // 🔹 **Get User by ID**
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.api}/users/${userId}`);
  }

  // 🔹 **Add New User**
  addUser(user: User) {
    return this.http.post<User>('http://localhost:8080/api/users/add', user);
  }
  
  
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}`);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/delete/${userId}`);
  }

  updateUser(userId: number, userData: any): Observable<any> {
    
    return this.http.put<any>(`${this.api}/update/${userId}`, userData);
  }
  

  getUserProfile(userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/users/profile/${userId}`);
  }
  
}


