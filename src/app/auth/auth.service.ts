import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export interface UserData {
  id?: string;
  fname?: string;
  lname?: string;
  username: string;
  password: string;
  status?: string;
}



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = new BehaviorSubject<UserData>(null);

  constructor( private http: HttpClient, private router: Router) { }

  onSignup(data: UserData) {
    return this.http.post<{ msg: string, userdata: UserData}>('http://localhost:3000/api/user/register', data);
  }
  onSignin(data: UserData) {
    return this.http.post<{ msg: string, userdata: UserData}>('http://localhost:3000/api/user/login', data);
  }
}
