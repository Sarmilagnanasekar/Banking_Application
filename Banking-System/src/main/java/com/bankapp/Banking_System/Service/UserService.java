package com.bankapp.Banking_System.Service;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bankapp.Banking_System.Entity.Account;
import com.bankapp.Banking_System.Entity.User;
import com.bankapp.Banking_System.Repository.AccountRepository;
import com.bankapp.Banking_System.Repository.TransactionRepository;
import com.bankapp.Banking_System.Repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
@Autowired
    UserRepository userRepository ;
@Autowired
    TransactionRepository transactionRepository;
@Autowired
    AccountRepository accountRepository;
// ✅ Create a new user
public User createUser(User user) {
    return userRepository.save(user);
}

@Transactional
public void deleteUser(Long userId) {
    transactionRepository.deleteByUserId(userId);  // Delete transactions first
    userRepository.deleteById(userId);  // Then delete the user
}



public User updateUser(User user) {
    return userRepository.save(user);  // Saves updated user details
}

public List<User> getAllUsers() {
    return userRepository.findAll();
}
public Optional<User> authenticate(String email, String password) {
    return userRepository.findByEmail(email)
            .filter(user -> user.getPassword().equals(password)); // 🔴 Replace with hashed password checking in production
}

public User addUser(User user) {
    return userRepository.save(user);
}


// Fetch user by email (Fix for possible NullPointerException)
public Optional<User> getUserByEmail(String email) {
    if (email == null || email.trim().isEmpty()) {
        return Optional.empty(); // Handle empty email
    }
    return userRepository.findByEmail(email.trim());
}

// Method to fetch account details by email
public Optional<Account> getAccountByEmail(String email) {
    // Fetch the account details by email from the database
    return accountRepository.findByEmail(email);
}




public Optional<User> getUserById(Long userId) {
	// TODO Auto-generated method stub
	return userRepository.findById(userId);
}

public User saveUser(User user) {
	// TODO Auto-generated method stub
	return userRepository.save(user);
}

}
