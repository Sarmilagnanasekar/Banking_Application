package com.bankapp.Banking_System.Controller;

import com.bankapp.Banking_System.Entity.Account;
import com.bankapp.Banking_System.Entity.User;
import com.bankapp.Banking_System.Service.AccountService;
import com.bankapp.Banking_System.Service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;
    
    @Autowired
    private UserService userService;
    

    @PostMapping("/create")
    public ResponseEntity<?> createAccount(@RequestBody Account account) {
        System.out.println("Received Data: " + account); // Debugging
        try {
            Account savedAccount = accountService.createAccount(account);
            return ResponseEntity.ok(savedAccount);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating account: " + e.getMessage());
        }
    }
  

    // Get all accounts
    @GetMapping("/all")
    public ResponseEntity<List<Account>> getAllAccounts() {
        return ResponseEntity.ok(accountService.getAllAccounts());
    }

    // Get account by ID
    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable Long id) {
        return ResponseEntity.ok(accountService.getAccountById(id));
    }

    // Get account by Email
    @GetMapping("/email/{email}")
    public ResponseEntity<Account> getAccountByEmail(@PathVariable String email) {
        return ResponseEntity.ok(accountService.getAccountByEmail(email));
    }

    // Update account
    @PutMapping("/update/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable Long id, @RequestBody Account account) {
        return ResponseEntity.ok(accountService.updateAccount(id, account));
    }

    // Delete account
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable Long id) {
        accountService.deleteAccount(id);
        return ResponseEntity.ok("Account deleted successfully!");
    }

    // Deposit amount
    @PutMapping("/{id}/deposit")
    public ResponseEntity<Account> deposit(@PathVariable Long id, @RequestParam Double amount) {
        return ResponseEntity.ok(accountService.deposit(id, amount));
    }

    // Withdraw amount
    @PutMapping("/{id}/withdraw")
    public ResponseEntity<Account> withdraw(@PathVariable Long id, @RequestParam Double amount) {
        return ResponseEntity.ok(accountService.withdraw(id, amount));
    }

    // Check balance
    @GetMapping("/{id}/balance")
    public ResponseEntity<BigDecimal> checkBalance(@PathVariable Long id) {
        Account account = accountService.getAccountById(id);
        return ResponseEntity.ok(account.getBalance());
    }

    @PostMapping("/transfer")
    public ResponseEntity<Map<String, String>> transfer(@RequestBody Map<String, Object> request) {
        try {
            String senderEmail = (String) request.get("senderEmail");
            String recipientEmail = (String) request.get("recipientEmail");
            double amount = Double.parseDouble(request.get("amount").toString());

            accountService.transfer(senderEmail, recipientEmail, amount);
            
            return ResponseEntity.ok(Map.of("message", "Transfer successful!"));  // ✅ Return JSON response
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("error", "Transfer failed: " + e.getMessage()));  // ✅ Return proper error message
        }
    }

  
    // Generate report (Modify based on your requirements)
    @GetMapping("/report")
    public ResponseEntity<String> generateAccountReport() {
        String report = accountService.generateReport();
        return ResponseEntity.ok(report);
    }
}
