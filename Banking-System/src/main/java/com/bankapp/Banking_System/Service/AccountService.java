package com.bankapp.Banking_System.Service;

import com.bankapp.Banking_System.Entity.Account;
import com.bankapp.Banking_System.Repository.AccountRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JavaMailSender mailSender;  // ✅ FIXED: Added mailSender

    // ✅ Create a new account
    public Account createAccount(Account account) {
        Account savedAccount = accountRepository.save(account);
        
        // Send email notification
        sendEmail(account.getEmail(), "Account Created", "Your account has been successfully created!");
        
        return savedAccount;
    }

    // ✅ Get all accounts
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    // ✅ Get Account by ID (Corrected)
    public Account getAccountById(Long id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Account not found with ID: " + id));
    }

    // ✅ Get Account by Email
    public Account getAccountByEmail(String email) {
        return accountRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Account not found with Email: " + email));
    }

    // ✅ Update Account
    public Account updateAccount(Long accountId, Account updatedAccount) {
        Account existingAccount = getAccountById(accountId);

        existingAccount.setAccountHolderName(updatedAccount.getAccountHolderName());
        existingAccount.setEmail(updatedAccount.getEmail());
        existingAccount.setBalance(updatedAccount.getBalance());
        existingAccount.setAccountType(updatedAccount.getAccountType());

        return accountRepository.save(existingAccount);
    }

    // ✅ Delete Account
    public void deleteAccount(Long accountId) {
        if (!accountRepository.existsById(accountId)) {
            throw new EntityNotFoundException("Account not found with ID: " + accountId);
        }
        accountRepository.deleteById(accountId);
    }

    // ✅ Deposit Money
    public Account deposit(Long id, Double amount) {
        Account account = getAccountById(id);
        account.setBalance(account.getBalance().add(BigDecimal.valueOf(amount)));
        return accountRepository.save(account);
    }

    // ✅ Withdraw Money
    public Account withdraw(Long id, Double amount) {
        Account account = getAccountById(id);
        BigDecimal newBalance = account.getBalance().subtract(BigDecimal.valueOf(amount));

        if (newBalance.compareTo(BigDecimal.ZERO) < 0) {
            throw new RuntimeException("Insufficient balance");
        }

        account.setBalance(newBalance);
        return accountRepository.save(account);
    }

    // ✅ Get Balance
    public BigDecimal getBalance(Long accountId) {
        Account account = getAccountById(accountId);
        return account.getBalance();
    }

    // ✅ Transfer Money
    public void transfer(String senderEmail, String recipientEmail, double amount) {
        Account sender = getAccountByEmail(senderEmail);
        Account recipient = getAccountByEmail(recipientEmail);

        if (sender.getBalance().compareTo(BigDecimal.valueOf(amount)) < 0) {
            throw new RuntimeException("Insufficient balance for transfer");
        }

        sender.setBalance(sender.getBalance().subtract(BigDecimal.valueOf(amount)));
        recipient.setBalance(recipient.getBalance().add(BigDecimal.valueOf(amount)));

        accountRepository.save(sender);
        accountRepository.save(recipient);
    }

    

    // ✅ Send Email function (Fixed)
    private void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

	public String generateReport() {
		// TODO Auto-generated method stub
		return null;
	}
}
