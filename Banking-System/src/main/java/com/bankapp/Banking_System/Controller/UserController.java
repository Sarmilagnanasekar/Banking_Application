package com.bankapp.Banking_System.Controller;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.bankapp.Banking_System.Entity.User;
import com.bankapp.Banking_System.Repository.UserRepository;
import com.bankapp.Banking_System.Service.EmailService;
import com.bankapp.Banking_System.Service.UserService;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")

public class UserController {

	@Autowired
    private  UserService userService;
	@Autowired
	private EmailService emailService;
	 @Autowired
	 private UserRepository userRepository;

	  // ✅ Register User
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        // Check if email already exists
        if (userService.getUserByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("{\"message\": \"Email already exists!\"}");
        }

        // Save user (confirmPassword is NOT sent to backend)
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok("{\"message\": \"User registered successfully!\"}");
    }
 // Login a user
//    @PostMapping("/login")
//    public ResponseEntity<String> loginUser(@RequestBody User loginRequest) {
//        Optional<User> userOpt = userService.getUserByEmail(loginRequest.getEmail());
//        if (userOpt.isEmpty()) {
//            return ResponseEntity.status(401).body("User not found");
//        }
//
//        User user = userOpt.get();
//        if (user.getPassword().equals(loginRequest.getPassword())) {
//            return ResponseEntity.ok("Login successful");
//        } else {
//            return ResponseEntity.status(401).body("Invalid credentials");
//        }
//    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        System.out.println("Received login request: " + email); // Debug log

        Optional<User> user = userService.authenticate(email, password);
        if (user.isPresent()) {
            return ResponseEntity.ok(Map.of("id", user.get().getUserId(), "message", "Login successful"));
        } else {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }
        
    }

//    @GetMapping("/getByEmail")
//    public ResponseEntity<?> getUserByEmail(@RequestParam String email) {
//        // Trim email to avoid whitespace issues
//        String cleanedEmail = email.trim();
//        System.out.println("Received email: " + cleanedEmail);  // Debugging log
//        
//        Optional<User> userOpt = userService.getUserByEmail(cleanedEmail);
//        
//        if (userOpt.isPresent()) {
//            return ResponseEntity.ok(userOpt.get());  // ✅ Return user details
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                                 .body("{\"message\": \"User not found\"}");
//        }
//    }
    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        Optional<User> userOpt = userService.getUserById(userId);
        
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());  // ✅ Return user details
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("{\"message\": \"User not found\"}");
        }
    }




    // ✅ Helper method to generate 6-digit code
    private String generateVerificationCode() {
        return String.valueOf(new Random().nextInt(900000) + 100000); // 6-digit code
    }


//
//    @GetMapping("/profile/{userId}")
//    public ResponseEntity<?> getUserProfile(@PathVariable Long userId) {
//        Optional<User> userOpt = userService.getUserById(userId);
//        
//        if (userOpt.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
//        }
//
//        User user = userOpt.get();
//        return ResponseEntity.ok(user);  // ✅ Just return user data
//    }
    // Fetch all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

//    @PutMapping("block/{userId}")
//    public ResponseEntity<?> blockUser(@PathVariable Long userId) {
//        Optional<User> userOptional = userRepository.findById(userId);
//        
//        if (userOptional.isPresent()) {
//            User user = userOptional.get();
//            user.setBlocked(true);
//            userRepository.save(user);
//            
//            // ✅ Return JSON response instead of an empty body
//            return ResponseEntity.ok(Map.of("message", "User blocked successfully", "userId", userId));
//        }
//        
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));
//    }


//    // Unblock user
//    @PutMapping("/unblock/{id}")
//    public ResponseEntity<String> unblockUser(@PathVariable Long id) {
//        userService.unblockUser(id);
//        return ResponseEntity.ok("User unblocked successfully.");
//    }

 // ✅ Update user details
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
    	System.out.println("id: " +id);
    	System.out.println("updatedUser:" +updatedUser );
        Optional<User> existingUserOpt = userService.getUserById(id);

        if (existingUserOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("{\"message\": \"User not found\"}");
        }

        User existingUser = existingUserOpt.get();
        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPassword(updatedUser.getPassword());
       

        User savedUser = userService.updateUser(existingUser);
        return ResponseEntity.ok(savedUser);
    }
    @PostMapping("/add")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        try {
            if (user.getName() == null || user.getEmail() == null || user.getPassword() == null) {
                return ResponseEntity.badRequest().body("All fields are required.");
            }
            
            User savedUser = userService.saveUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding user: " + e.getMessage());
        }
    }


    // ✅ Delete user by ID
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok().body("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user");
        }
    }





    // ✅ Create a new user (For Testing)
    @PostMapping("/")
    public ResponseEntity<User> createUser(@Validated @RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }
}

/*
 * package com.bankapp.Banking_System.Controller;
 * 
 * import lombok.RequiredArgsConstructor;
 * 
 * import org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.http.HttpStatus; import
 * org.springframework.http.ResponseEntity; import
 * org.springframework.validation.annotation.Validated; import
 * org.springframework.web.bind.annotation.*;
 * 
 * import com.bankapp.Banking_System.Entity.Account; import
 * com.bankapp.Banking_System.Entity.User; import
 * com.bankapp.Banking_System.Repository.UserRepository; import
 * com.bankapp.Banking_System.Service.AccountService; import
 * com.bankapp.Banking_System.Service.EmailService; import
 * com.bankapp.Banking_System.Service.UserService;
 * 
 * import java.util.List; import java.util.Map; import java.util.Optional;
 * import java.util.Random;
 * 
 * @RestController
 * 
 * @RequestMapping("/api/users")
 * 
 * @CrossOrigin(origins = "http://localhost:4200")
 * 
 * public class UserController {
 * 
 * @Autowired private UserService userService;
 * 
 * @Autowired private EmailService emailService;
 * 
 * @Autowired private UserRepository userRepository;
 * 
 * @Autowired private AccountService accountService;
 * 
 * // ✅ Register User
 * 
 * @PostMapping("/register") public ResponseEntity<?> registerUser(@RequestBody
 * User user) { // Check if email already exists if
 * (userService.getUserByEmail(user.getEmail()).isPresent()) { return
 * ResponseEntity.badRequest().body("{\"message\": \"Email already exists!\"}");
 * }
 * 
 * // Save user (confirmPassword is NOT sent to backend) User createdUser =
 * userService.createUser(user); return
 * ResponseEntity.ok("{\"message\": \"User registered successfully!\"}"); }
 * 
 * @PostMapping("/login") public ResponseEntity<?> login(@RequestBody
 * Map<String, String> loginData) { String email = loginData.get("email");
 * String password = loginData.get("password");
 * 
 * System.out.println("Received login request: " + email); // Debug log
 * 
 * Optional<User> user = userService.authenticate(email, password); if
 * (user.isPresent()) { return ResponseEntity.ok(Map.of("id",
 * user.get().getUserId(), "message", "Login successful")); } else { return
 * ResponseEntity.status(401).body(Map.of("message", "Invalid credentials")); }
 * 
 * }
 * 
 * @GetMapping("/email/{email}") public Account getAccountByEmail(@PathVariable
 * String email) { // Fetch account details using email return
 * accountService.getAccountByEmail(email); }
 * 
 * @GetMapping("/getByEmail") public ResponseEntity<?>
 * getUserByEmail(@RequestParam String email) { // Trim email to avoid
 * whitespace issues String cleanedEmail = email.trim();
 * System.out.println("Received email: " + cleanedEmail); // Debugging log
 * 
 * Optional<User> userOpt = userService.getUserByEmail(cleanedEmail);
 * 
 * if (userOpt.isPresent()) { return ResponseEntity.ok(userOpt.get()); // ✅
 * Return user details } else { return
 * ResponseEntity.status(HttpStatus.NOT_FOUND)
 * .body("{\"message\": \"User not found\"}"); } }
 * 
 * @GetMapping("/profile/{userId}") public ResponseEntity<?>
 * getUserById(@PathVariable Long userId) { Optional<User> userOpt =
 * userService.getUserById(userId);
 * 
 * if (userOpt.isPresent()) { return ResponseEntity.ok(userOpt.get()); // ✅
 * Return user details } else { return
 * ResponseEntity.status(HttpStatus.NOT_FOUND)
 * .body("{\"message\": \"User not found\"}"); } }
 * 
 * 
 * 
 * 
 * // ✅ Helper method to generate 6-digit code private String
 * generateVerificationCode() { return String.valueOf(new
 * Random().nextInt(900000) + 100000); // 6-digit code }
 * 
 * // Fetch all users
 * 
 * @GetMapping public ResponseEntity<List<User>> getAllUsers() { return
 * ResponseEntity.ok(userService.getAllUsers()); }
 * 
 * 
 * // ✅ Update user details
 * 
 * @PutMapping("/update/{id}") public ResponseEntity<?> updateUser(@PathVariable
 * Long id, @RequestBody User updatedUser) { System.out.println("id: " +id);
 * System.out.println("updatedUser:" +updatedUser ); Optional<User>
 * existingUserOpt = userService.getUserById(id);
 * 
 * if (existingUserOpt.isEmpty()) { return
 * ResponseEntity.status(HttpStatus.NOT_FOUND)
 * .body("{\"message\": \"User not found\"}"); }
 * 
 * User existingUser = existingUserOpt.get();
 * existingUser.setName(updatedUser.getName());
 * existingUser.setEmail(updatedUser.getEmail());
 * existingUser.setPassword(updatedUser.getPassword());
 * 
 * 
 * User savedUser = userService.updateUser(existingUser); return
 * ResponseEntity.ok(savedUser); }
 * 
 * @PostMapping("/add") public ResponseEntity<?> addUser(@RequestBody User user)
 * { try { if (user.getName() == null || user.getEmail() == null ||
 * user.getPassword() == null) { return
 * ResponseEntity.badRequest().body("All fields are required."); }
 * 
 * User savedUser = userService.saveUser(user); return
 * ResponseEntity.ok(savedUser); } catch (Exception e) { e.printStackTrace();
 * return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).
 * body("Error adding user: " + e.getMessage()); } }
 * 
 * 
 * // ✅ Delete user by ID
 * 
 * @DeleteMapping("delete/{id}") public ResponseEntity<?>
 * deleteUser(@PathVariable Long id) { try { userService.deleteUser(id); return
 * ResponseEntity.ok().body("User deleted successfully"); } catch (Exception e)
 * { return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).
 * body("Error deleting user"); } }
 * 
 * 
 * 
 * 
 * 
 * // ✅ Create a new user (For Testing)
 * 
 * @PostMapping("/") public ResponseEntity<User>
 * createUser(@Validated @RequestBody User user) { User createdUser =
 * userService.createUser(user); return ResponseEntity.ok(createdUser); } }
 */