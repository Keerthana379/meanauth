import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user: any) {
    // Initialize error array
    const errors = [];

    // Validate name
    if (!this.validateName(user.name)) {
      errors.push('Name is required');
    }

    // Validate username
    if (!this.validateUsername(user.username)) {
      errors.push('Username is required');
    }

    // Validate password
    if (!this.validatePassword(user.password)) {
      errors.push('Password is required');
    }

    // Return errors (empty array means no errors)
    return errors;
  }

  validateName(name: string) {
    return name.trim() !== ''; // Check if name is not empty or whitespace
  }

  validateUsername(username: string) {
    return username.trim() !== ''; // Check if username is not empty or whitespace
  }

  validatePassword(password: string) {
    return password.trim() !== ''; // Check if password is not empty or whitespace
  }

  validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
