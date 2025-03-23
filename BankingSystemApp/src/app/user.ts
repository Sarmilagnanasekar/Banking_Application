export interface User {
    userId?: number; 
    name: string;  // ✅ Use lowercase "name" to match backend
    email: string; // ✅ Change "emailId" to "email" to match backend
    password: string;
    blocked: boolean; // ✅ Add blocked field to match backend
}
