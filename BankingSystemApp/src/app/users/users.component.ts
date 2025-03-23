import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  standalone:false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  user: any;
  http: any;
  router: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
  this.userService.getUsers().subscribe((data: any[]) => {
   
    this.users = data;
  }, (error) => {
    console.error("Error fetching users:", error);
  });
}

  newUser: User = {
    name: '', email: '', password: '',
    blocked: false
  };

  fetchUsers() {
   
    this.userService.getUsers().subscribe(

      (data) => {
        this.users = data;
        //console.log(JSON.stringify(this.users))
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }
  deleteUser(user: any) {
    console.log("User object received:", user); // Debugging
  
    if (!user || !user.userId) {
      console.error("Error: userId is undefined or missing!", user);
      return;
    }
  
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.userService.deleteUser(user.userId).subscribe(() => {
        this.users = this.users.filter(u => u.userId !== user.userId);
        console.log(`User with ID ${user.userId} deleted successfully.`);
      }, (error) => {
        console.error("Error deleting user:", error);
      });
    }
  }
  
  
  updateUser(user: any) {
   
  
    // Prompt user for updated details (name, email, and password)
    const newName = prompt('Enter new name:', user.name);
    const newEmail = prompt('Enter new email:', user.email);
    const newPassword = prompt('Enter new password:'); // No default value for security
  
    // If the user cancels all prompts, do nothing
    if (newName === null && newEmail === null && newPassword === null) {
      return;
    }
  
    // Create an updated user object with the existing ID
    const updatedUser: any = { userId: user.userId };
  
    // Only update fields if they are changed
    if (newName !== null && newName !== user.name) {
      updatedUser.name = newName;
    }
    if (newEmail !== null && newEmail !== user.email) {
      updatedUser.email = newEmail;
    }
    if (newPassword !== null && newPassword.trim() !== '') {
      updatedUser.password = newPassword;
    }
  
    console.log("Updated User Object:", updatedUser);
  
    // Ensure at least one field is updated before making an API call
    if (Object.keys(updatedUser).length > 1) {
      this.userService.updateUser(user.userId, updatedUser).subscribe(() => {
        // Update the local users array
        this.users = this.users.map(u => (u.userId === user.userId ? { ...u, ...updatedUser } : u));
      });
    }
  }
  
  
  addUser() {
    if (!this.newUser.name || !this.newUser.email || !this.newUser.password) {
      alert('❌ All fields are required!');
      return;
    }
  
    console.log("🚀 Adding user:", this.newUser);
  
    this.userService.addUser(this.newUser).subscribe(
      (createdUser) => {
        console.log("✅ User added successfully:", createdUser);
        this.users.push(createdUser); // Update the UI immediately
        this.newUser = { userId: 0, name: '', email: '', password: '', blocked: false }; // Reset form
      },
      (error) => {
        console.error("❌ Error adding user:", error);
        alert(`Failed to add user. Server response: ${error.message}`);
      }
    );
  }
  
  
   
    
    

}
