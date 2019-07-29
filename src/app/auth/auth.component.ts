import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    message: string = null;
    authObs: Observable<{ msg: string, token: string }>;
    isLoginMode = true;
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }

    onChangeMode() {
      this.isLoginMode = !this.isLoginMode;
    }
    onSubmit(f: NgForm) {
      if (this.isLoginMode) {
        let obj: UserData;
        obj = f.value;
        this.authObs = this.authService.onSignin(obj);
        f.reset();
        this.authObs.subscribe(
          (res) => {
            console.log(res);
            if (res.token) {
              localStorage.setItem('token', JSON.stringify(res.token));
              this.authService.user.next(res.token);
              this.router.navigate(['/events/new/event']);
            } else {
              this.message = res.msg;
            }
            // if (res.userdata) {
            //   localStorage.setItem('user', JSON.stringify(res.userdata));
            //   this.authService.user.next(res.userdata);
            //   this.message = res.msg;
            //   this.router.navigate(['/events/new']);
            // } else {
            //   this.message = res.msg;
            // }
          }
        );
      } else {
        let obj: UserData;
        obj = f.value;
        obj.status = 'active';
        this.authObs = this.authService.onSignup(obj);
        f.reset();
        this.authObs.subscribe(
          (res) => {
            console.log(res);
            if (res.token) {
              localStorage.setItem('token', JSON.stringify(res.token));
              this.authService.user.next(res.token);
              this.router.navigate(['/events/new/event']);
            } else {
              this.message = res.msg;
            }
            // if (res.userdata) {
            //   localStorage.setItem('user', JSON.stringify(res.userdata));
            //   this.authService.user.next(res.userdata);
            //   this.message = res.msg;
            //   this.router.navigate(['/events/new']);
            // } else {
            //   this.message = res.msg;
            // }
          }
        );
      }


    }
}
