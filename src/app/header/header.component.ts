import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth = false;
  //  fname: string = null;
   
  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.authService.user.subscribe( (token) => {
      this.isAuth = !!token;
    } );

    // this.isAuth = this.authService.isLoggedIn();
    // console.log('ng oninit:' + this.isAuth);
    
    
  //   this.authService.user.subscribe(
  //     (userData) => {
  //       if (userData) {
  //         this.fname = userData.fname;
  //       }
  //       this.isAuth = !!userData;
  //     }
  //   );
     }
     onLogout() {
       this.authService.onLogout();
     }

}
