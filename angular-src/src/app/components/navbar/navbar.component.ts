import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showMessage = false;
  messageText = '';

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logout();
    this.showMessage = true;
    this.messageText = 'You are logged out';
    setTimeout(() => {
      this.showMessage = false;
      this.messageText = '';
      this.router.navigate(['/login']);
    }, 30000);
  }
}
