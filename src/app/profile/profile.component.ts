import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fname: string;
  lname: string;
  username: string;
  role: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<{ msg: string, userData: UserData}>('http://localhost:3000/api/user').subscribe(
      (res) => {
        this.fname = res.userData.fname;
        this.lname = res.userData.lname;
        this.username = res.userData.username;
        this.role = res.userData.role;
      });
  }

}
