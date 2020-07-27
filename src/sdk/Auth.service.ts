import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class AuthService {
  constructor() { }

  // Check if LocalStorage empty
  checkUser() {
    // Change to read username,email & DOB ..
    if (localStorage.length === 3) {
      return true;
    } else {
      return false;
    }
  }

  // Save user details on Login
  saveUser(user) {
    // console.log(user);
    this.setSessions(user);
  }

  // Remove user details on Logout
  removeUser() {
    this.removeSessions();
  }


  private setSessions(user) {
    localStorage.setItem('username', user.Username);
    localStorage.setItem('email', user.Email);
    localStorage.setItem('DOB', user.DOB);
  }

  private removeSessions() {
    localStorage.clear();
  }

}
