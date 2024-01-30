import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.username = '';
    this.password = '';
  }

  ngOnInit() {}

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password,
      name: '', 
      email: ''
    };

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        alert('You are now logged in'); 
        this.router.navigate(['dashboard']);
      } else {
        alert(data.msg);
        this.router.navigate(['login']);
      }
    });
    
  }
}
