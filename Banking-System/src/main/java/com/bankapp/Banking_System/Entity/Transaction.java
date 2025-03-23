package com.bankapp.Banking_System.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private User user;
    @Column(nullable = false)
    private String status; // NEW FIELD: "SUCCESS", "FAILED", "SUSPICIOUS"



	@Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String transactionType;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private LocalDateTime transactionDate;

	public Long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(LocalDateTime transactionDate) {
		this.transactionDate = transactionDate;
	}

	@Override
	public String toString() {
		return "Transaction [transactionId=" + transactionId + ", account=" + account + ", user=" + user + ", status="
				+ status + ", amount=" + amount + ", transactionType=" + transactionType + ", description="
				+ description + ", transactionDate=" + transactionDate + "]";
	}
    // Getters and Setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Transaction(Long transactionId, Account account, User user, String status, Double amount,
			String transactionType, String description, LocalDateTime transactionDate) {
		super();
		this.transactionId = transactionId;
		this.account = account;
		this.user = user;
		this.status = status;
		this.amount = amount;
		this.transactionType = transactionType;
		this.description = description;
		this.transactionDate = transactionDate;
	}

	

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	
	}
	
	public Transaction() {
		super();
		// TODO Auto-generated constructor stub
	}


	
}
