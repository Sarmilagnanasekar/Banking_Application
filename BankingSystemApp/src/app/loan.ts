export interface LoanApplication {
    id?: number; // Optional for new applications
    amount: number;
    tenure: number;
    interestRate: number;
    type: string; // Loan type (Education, Home, etc.)
    userId: number;
    termmoth:number;
    status?: string; // 'Pending', 'Approved', 'Rejected'
  }
  