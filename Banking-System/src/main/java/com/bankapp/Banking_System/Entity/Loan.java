package com.bankapp.Banking_System.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "loans")
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loanId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column( nullable = false)
    private Double loanAmount;

    @Column(nullable = false)
    private Double interestRate;
    
    @Column(nullable = false)
    private Double tenure;
  


	@Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private Integer termMonths;
    
    // ✅ Enum Field
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private LoanType loanType;

    // ✅ Getters & Setters
    public LoanType getLoanType() {
        return loanType;
    }

    public void setLoanType(LoanType loanType) {
        this.loanType = loanType;
    }


	public Long getLoanId() {
		return loanId;
	}

	public void setLoanId(Long loanId) {
		this.loanId = loanId;
	}

	public User getUser() {
		return user;
	}
	public Long getUserId() {
	    return user != null ? user.getUserId() : null;  // assuming `User` class has getUserId() method
	}

	public void setUser(User user) {
		this.user = user;
	}

	
	public Double getLoanAmount() {
		return loanAmount;
	}

	public void setLoanAmount(Double loanAmount) {
		this.loanAmount = loanAmount;
	}

	public Double getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(Double interestRate) {
		this.interestRate = interestRate;
	}

	public Integer getTermMonths() {
		return termMonths;
	}

	public void setTermMonths(Integer termMonths) {
		this.termMonths = termMonths;
	}


	public Double getTenure() {
		return tenure;
	}

	public void setTenure(Double tenure) {
		this.tenure = tenure;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Loan [loanId=" + loanId + ", user=" + user + ", amount=" + loanAmount + ", interestRate=" + interestRate
				+ ", tenure=" + tenure + ", status=" + status + ", termMonths=" + termMonths + "loanType=" + loanType + "]";
	}

	  
    public Loan(Long loanId, User user, Double amount, Double interestRate, Double tenure, String status,
			Integer termMonths,LoanType loanType) {
		super();
		this.loanId = loanId;
		this.user = user;
		this.loanAmount = amount;
		this.interestRate = interestRate;
		this.tenure = tenure;
		this.status = status;
		this.termMonths = termMonths;
		this.loanType=loanType;
		
	}
	public Loan() {
		super();
		// TODO Auto-generated constructor stub
	}

	
    
}
