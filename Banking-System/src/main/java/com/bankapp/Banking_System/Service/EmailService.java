package com.bankapp.Banking_System.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // General Email Sending Method
    public void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            System.out.println("✅ Email Sent Successfully to " + to);
        } catch (Exception e) {
            System.err.println("❌ Error sending email: " + e.getMessage());
        }
    }

    // Transaction Email Method (Deposit, Withdraw, Transfer)
    public void sendTransactionEmail(String email, String transactionType, double amount, double newBalance) {
        String subject = "Banking Alert: " + transactionType + " Successful";
        String body = "Dear Customer,\n\n" +
                      "Your " + transactionType + " of $" + amount + " has been successfully processed.\n" +
                      "Your new account balance is: $" + newBalance + ".\n\n" +
                      "Thank you for banking with us!\n" +
                      "Best Regards,\nBanking System Team";

        sendEmail(email, subject, body);
    }
}
