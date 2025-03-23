package com.bankapp.Banking_System.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bankapp.Banking_System.Entity.Account;
import com.bankapp.Banking_System.Entity.Transaction;
import com.bankapp.Banking_System.Repository.AccountRepository;
import com.bankapp.Banking_System.Repository.TransactionRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;
    
    @Autowired
    private AccountRepository accountRepository;
    public List<Transaction> getTransactionsByAccountId(Long accountId) {
        return transactionRepository.findByAccountAccountId(accountId);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }


    public Transaction createTransaction(Transaction transaction) {
        Account account = accountRepository.findById(transaction.getAccount().getAccountId())
                .orElseThrow(() -> new RuntimeException("❌ Account not found!"));

        double transactionAmount = transaction.getAmount().doubleValue();
        if ("Debit".equalsIgnoreCase(transaction.getTransactionType())) {
            if (account.getBalance().doubleValue() < transactionAmount) {
                throw new RuntimeException("❌ Insufficient funds!");
            }
            account.setBalance(BigDecimal.valueOf(account.getBalance().doubleValue() - transactionAmount));
        } else if ("Credit".equalsIgnoreCase(transaction.getTransactionType())) {
            account.setBalance(BigDecimal.valueOf(account.getBalance().doubleValue() + transactionAmount));
        }

        // ✅ Save updated balance
        accountRepository.save(account);

        // ✅ Save Transaction
        transaction.setTransactionDate(LocalDateTime.now());
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getSuspiciousTransactions() {
        return transactionRepository.findByStatus("SUSPICIOUS");
    }

}

