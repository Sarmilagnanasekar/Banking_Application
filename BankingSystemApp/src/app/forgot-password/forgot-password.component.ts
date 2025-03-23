import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  standalone:false,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  verificationCode: string = '';
  enteredCode: string = '';
  newPassword: string = '';

  isCodeSent: boolean = false;
  isVerified: boolean = false;
  generatedCode: string = '';

  constructor(private http: HttpClient) {}

  // ✅ Step 1: Send Verification Code to Email
  sendVerificationCode() {
    this.http.get<boolean>(`http://localhost:8080/api/users/check-email?email=${this.email}`)
      .subscribe(
        (exists) => {
          if (exists) {
            this.generatedCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit code
            this.http.post('http://localhost:8080/api/users/send-email', {
              to: this.email,
              subject: 'Password Reset Code',
              body: `Your verification code is: ${this.generatedCode}`
            }).subscribe(() => {
              this.isCodeSent = true;
              Swal.fire('Success', 'Verification code sent to your email.', 'success');
            });
          } else {
            Swal.fire('Error', 'Email not found in database.', 'error');
          }
        },
        () => Swal.fire('Error', 'Server error. Try again.', 'error')
      );
  }

  // ✅ Step 2: Verify Entered Code
  verifyCode() {
    if (this.enteredCode === this.generatedCode) {
      this.isVerified = true;
      Swal.fire('Verified', 'Code matched successfully!', 'success');
    } else {
      Swal.fire('Error', 'Invalid verification code.', 'error');
    }
  }

  // ✅ Step 3: Reset Password
  resetPassword() {
    this.http.post('http://localhost:8080/api/users/reset-password', {
      email: this.email,
      newPassword: this.newPassword
    }).subscribe(
      () => Swal.fire('Success', 'Password reset successfully!', 'success'),
      () => Swal.fire('Error', 'Failed to reset password.', 'error')
    );
  }
}
