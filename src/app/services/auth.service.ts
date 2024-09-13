import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzI3NzM1MDEwLCJleHAiOjE3Mjc3MzUwMTB9.1AotpQk7VLuGNOIF6ZeDy05S9oV9Ww2uZjZtWcbwxHY';
    constructor(){}
    getToken(): string | null{
        return localStorage.getItem('token');
    }
    saveToken(): void{
        localStorage.setItem('token', this.token);
    }
    removeToken(): void{
        localStorage.removeItem('token');
    }
}