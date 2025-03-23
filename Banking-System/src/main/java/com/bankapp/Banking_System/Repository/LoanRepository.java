package com.bankapp.Banking_System.Repository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bankapp.Banking_System.Entity.Loan;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {

	 // Fetch all loans
    List<Loan> findAll();

    // Fetch loans by user ID
    List<Loan> findByUser_UserId(Long userId);

    // Fetch loans by status
    List<Loan> findByStatus(String status);
    List<Loan> findByUserUserId(Long userId);
}