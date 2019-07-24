import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
   isAuth = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const userData = localStorage.getItem('user');
    this.isAuth = !!userData;
    
  //   this.authService.user.subscribe(
  //     (userData) => {
  //       console.log(userData);
        
  //       this.isAuth = !!userData;
  //     }
  //   );
  // }

}

ngOnChanges () {
  const userData = localStorage.getItem('user');
  this.isAuth = !!userData;
}
}