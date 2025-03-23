package com.bankapp.Banking_System.Entity;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "Accounts")
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long accountId;

	@Column(nullable = false)
	private String accountHolderName;

	@Column(nullable = false, unique = true)
	private String email; // For email notification

	@Column(nullable = false)
	private BigDecimal balance; // Using BigDecimal for precision

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private AccountType accountType; // Using Enum for account types

	@OneToOne
	@JoinColumn(name = "user_id", referencedColumnName = "userId")
	private User user;





	@Override
	public String toString() {
		return "Account [accountId=" + accountId + ", accountHolderName=" + accountHolderName + ", email=" + email
				+ ", balance=" + balance + ", accountType=" + accountType + ", user=" + user + ", transactions="
				+ "]";
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	// Default constructor
	public Account() {
	}



	// Getters and Setters
	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getAccountHolderName() {
		return accountHolderName;
	}

	public void setAccountHolderName(String accountHolderName) {
		this.accountHolderName = accountHolderName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public BigDecimal getBalance() {
		return balance;
	}

	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
	}

	// Enum for account types
	public enum AccountType {
		SAVINGS, CURRENT;
	}

	public Account(Long accountId, String accountHolderName, String email, BigDecimal balance, AccountType accountType,
			User user) {
		super();
		this.accountId = accountId;
		this.accountHolderName = accountHolderName;
		this.email = email;
		this.balance = balance;
		this.accountType = accountType;
		this.user = user;

	}

}
