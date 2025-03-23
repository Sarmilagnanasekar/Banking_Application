package com.bankapp.Banking_System.Entity;

import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;
//    @Column(name = "blocked")
//    private Boolean blocked = false; 
    // Getters and Setters
   
    

	public Long getUserId() {
		return userId;
	}

	public User(Long userId, String name, String email, String password, Boolean blocked) {
		super();
		this.userId = userId;
		this.name = name;
		this.email = email;
		this.password = password;
	
	}


	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", name=" + name + ", email=" + email + ", password=" + password
				+ ", blocked=" +  "]";
	}

	

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

}
