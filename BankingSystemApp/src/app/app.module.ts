import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi ,withFetch} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { LoanComponent } from './loan/loan.component';
import { TransactionComponent } from './transaction/transaction.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admindashboard/admindashboard.component';
import { AdminLoginComponent } from './adminlogin/adminlogin.component';
import { AccountComponent } from './account/account.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoanServicesComponent } from './loan-services/loan-services.component';
import { SavingsSchemesComponent } from './savings-schemes/savings-schemes.component';
import { InsideHeaderComponent } from './inside-header/inside-header.component';
import { NormalHeaderComponent } from './normal-header/normal-header.component';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    LoanComponent,
    TransactionComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    LoanServicesComponent,
    SavingsSchemesComponent,
    InsideHeaderComponent,
    NormalHeaderComponent,
    UsersComponent,

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    

  
  
  

  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
     // Use provideHttpClient to configure HTTP client and interceptors
     provideHttpClient(withInterceptorsFromDi(),withFetch()), // Updated method
     provideClientHydration(withEventReplay()), provideAnimationsAsync()

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
