import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface UserData {
  id?: string;
  fname?: string;
  lname?: string;
  username?: string;
  password?: string;
  status?: string;
  role?: string;
}



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = new BehaviorSubject<string>(null);

  constructor( private http: HttpClient, private router: Router) { }

  onSignup(data: UserData) {
    return this.http.post<{ msg: string, token: string }>('http://192.168.2.78:3000/api/user/register', data);
  }
  onSignin(data: UserData) {
    return this.http.post<{ msg: string, token: string}>('http://192.168.2.78:3000/api/user/login', data);
  }
  onLogout() {
    localStorage.removeItem('token');
    this.user.next(null);
    this.router.navigate(['/auth']);
  }
  getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
