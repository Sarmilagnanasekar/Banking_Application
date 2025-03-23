package com.bankapp.Banking_System.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bankapp.Banking_System.Entity.Transaction;
import com.bankapp.Banking_System.Service.TransactionService;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin("http://localhost:4200")
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @PostMapping("/create")
    public ResponseEntity<?> createTransaction(@RequestBody Transaction transaction) {
        System.out.println("📥 Received transaction request: " + transaction);

        try {
            Transaction savedTransaction = transactionService.createTransaction(transaction);
            System.out.println("✅ Transaction saved: " + savedTransaction);
            return ResponseEntity.ok(savedTransaction);
        } catch (Exception e) {
            System.err.println("❌ Error saving transaction: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/get/{accountId}")
    public ResponseEntity<List<Transaction>> getTransactionsByAccountId(@PathVariable Long accountId) {
        List<Transaction> transactions = transactionService.getTransactionsByAccountId(accountId);
        return ResponseEntity.ok(transactions);
    }
    // Fetch all transactions
    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions(@RequestParam(required = false) Long accountId) {
        List<Transaction> transactions;
        
        if (accountId != null) {
            transactions = transactionService.getTransactionsByAccountId(accountId);
        } else {
            transactions = transactionService.getAllTransactions();
        }
        
        return ResponseEntity.ok(transactions);
    }


    // Fetch suspicious transactions
    @GetMapping("/suspicious")
    public ResponseEntity<List<Transaction>> getSuspiciousTransactions() {
        return ResponseEntity.ok(transactionService.getSuspiciousTransactions());
    }
}
