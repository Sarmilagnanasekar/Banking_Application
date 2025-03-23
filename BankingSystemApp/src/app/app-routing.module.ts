import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoanComponent } from './loan/loan.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoanServicesComponent } from './loan-services/loan-services.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AdminDashboardComponent } from './admindashboard/admindashboard.component';
import { SavingsSchemesComponent } from './savings-schemes/savings-schemes.component';
import { AdminLoginComponent } from './adminlogin/adminlogin.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path: '', component: HomeComponent },           
  { path: 'account', component: AccountComponent },
  { path: 'admindashboard', component: AdminDashboardComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'loan', component: LoanComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'loan-services', component: LoanServicesComponent },
  { path: 'savings', component: SavingsSchemesComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'user', component:UsersComponent}
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
