/* export interface Transaction {
    userId: number;  
    accountId: number;
    status: string;  // Example: "SUCCESS", "FAILED", "SUSPICIOUS"
    amount: number;
    transactionType: string;  // Example: "Credit" or "Debit"
    description: string;
    transactionDate?: string;  // Optional since backend sets it automatically
  }*/

import { Account } from "./account";
import { User } from "./user";

  
  export interface Transaction {
    transactionId: number;
    account: Account;
    user: User;
    status: "SUCCESS" | "FAILED" | "SUSPICIOUS";  // Using string literal types for status
    amount: number;
    transactionType: string;  // Can be "CREDIT" or "DEBIT"
    description: string;
    transactionDate: string; // LocalDateTime equivalent
  }