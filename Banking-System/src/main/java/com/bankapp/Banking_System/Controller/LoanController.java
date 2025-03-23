package com.bankapp.Banking_System.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bankapp.Banking_System.Entity.Loan;
import com.bankapp.Banking_System.Service.LoanService;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
@CrossOrigin("http://localhost:4200")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @GetMapping
    public List<Loan> getAllLoans() {
        return loanService.getAllLoans();
    }

    @GetMapping("/{loanId}")
    public Loan getLoanById(@PathVariable Long loanId) {
        return loanService.getLoanById(loanId);
    }

    @PostMapping("/apply")
    public Loan applyLoan(@RequestParam Long userId, @RequestBody Loan loanRequest) {
        return loanService.applyLoan(userId, loanRequest);
    }

    @PutMapping("/update/{loanId}")
    public Loan updateLoan(@PathVariable Long loanId, @RequestBody Loan updatedLoan) {
        return loanService.updateLoan(loanId, updatedLoan);
    }

    @PutMapping("/approve/{loanId}")
    public Loan approveLoan(@PathVariable Long loanId) {
        return loanService.approveLoan(loanId);
    }

    @PutMapping("/reject/{loanId}")
    public Loan rejectLoan(@PathVariable Long loanId) {
        return loanService.rejectLoan(loanId);
    }

    @DeleteMapping("/delete/{loanId}")
    public ResponseEntity<String> deleteLoan(@PathVariable Long loanId) {
        loanService.deleteLoan(loanId);
        return ResponseEntity.ok("Loan deleted successfully");
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Loan>> getLoansByUserId(@PathVariable Long userId) {
        List<Loan> loans = loanService.getLoansByUserId(userId);
        return ResponseEntity.ok(loans);
    }

}
