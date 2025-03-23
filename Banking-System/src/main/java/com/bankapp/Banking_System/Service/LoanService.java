package com.bankapp.Banking_System.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bankapp.Banking_System.Entity.Loan;
import com.bankapp.Banking_System.Entity.User;
import com.bankapp.Banking_System.Repository.LoanRepository;
import com.bankapp.Banking_System.Repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private UserRepository userRepository;

    // Fetch all loans
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    // Fetch a loan by ID
    public Loan getLoanById(Long loanId) {
        return loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found with ID: " + loanId));
    }

    // Apply for a loan
    public Loan applyLoan(Long userId, Loan loanRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        loanRequest.setUser(user);
        loanRequest.setStatus("Pending"); // Default status
        return loanRepository.save(loanRequest);
    }

    // Update loan details
    public Loan updateLoan(Long loanId, Loan updatedLoan) {
        Loan existingLoan = getLoanById(loanId);

        existingLoan.setLoanAmount(updatedLoan.getLoanAmount());
        existingLoan.setInterestRate(updatedLoan.getInterestRate());
        existingLoan.setTermMonths(updatedLoan.getTermMonths());
        existingLoan.setLoanType(updatedLoan.getLoanType());

        return loanRepository.save(existingLoan);
    }

    // Approve a loan
    public Loan approveLoan(Long loanId) {
        Loan loan = getLoanById(loanId);
        loan.setStatus("Approved");
        return loanRepository.save(loan);
    }

    // Reject a loan
    public Loan rejectLoan(Long loanId) {
        Loan loan = getLoanById(loanId);
        loan.setStatus("Rejected");
        return loanRepository.save(loan);
    }

    // Delete a loan
    public void deleteLoan(Long loanId) {
        loanRepository.deleteById(loanId);
    }
    public List<Loan> getLoansByUserId(Long userId) {
        return loanRepository.findByUserUserId(userId);
    }

}
