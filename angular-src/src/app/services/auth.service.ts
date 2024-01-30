import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { tokenNotExpired } from 'angular2-jwt';

interface User {
  name: string;
  email: string;
  username: string;
  password: string;
}


@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private httpClient: HttpClient) { }

  registerUser(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.post('http://localhost:3000/users/register', user, httpOptions);
  }

  authenticateUser(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.post('http://localhost:3000/users/authenticate', user, httpOptions);
  }
  
  getProfile() {
    this.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authToken,
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.get('http://localhost:3000/users/profile', httpOptions);
  }

  storeUserData(token: string, user: User) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

 // Check if the user is authenticated
 loggedIn(): boolean {
  const token = localStorage.getItem('id_token');
  if (token) {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(tokenPayload.exp * 1000);

    const currentDate = new Date();
    return currentDate < expirationDate;
  } else {
    return false;
  }
}

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    alert('You have been successfully logged out'); // Display a logout alert
  }
  
}
