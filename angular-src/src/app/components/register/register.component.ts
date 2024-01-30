import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  name: string;
  username: string;
  email: string;
  password: string;

  nameError: boolean = false;
  usernameError: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;
  registrationSuccess: boolean = false;
  registrationMessage: string = '';

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.name = '';
    this.username = '';
    this.email = '';
    this.password = '';

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onRegisterSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const user = this.registerForm.value;

    this.nameError = false;
    this.usernameError = false;
    this.emailError = false;
    this.passwordError = false;
    this.registrationSuccess = false;
    this.registrationMessage = '';

    if (!this.validateService.validateName(user.name)) {
      this.nameError = true;
    }

    if (!this.validateService.validateUsername(user.username)) {
      this.usernameError = true;
    }

    if (!this.validateService.validatePassword(user.password)) {
      this.passwordError = true;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.emailError = true;
    }

    if (this.nameError || this.usernameError || this.passwordError || this.emailError) {
      return;
    }

    this.authService.registerUser(user).subscribe(
      (data: any) => {
        if (data.success) {
          this.registrationSuccess = true;
          alert('You are now registered. Redirecting to login...');
          this.registerForm.reset();
          this.router.navigate(['/login']);
        } else {
          alert('Something went wrong');
        }
      },
      (error) => {
        alert('Something went wrong');
      }
    );
  }
}
