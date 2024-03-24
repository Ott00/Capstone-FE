import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/auth/interfaces/auth-data';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userLoggedIn!: AuthData | null;
  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.userLoggedIn = user;
    });
  }

  logout() {
    this.authSrv.logout();
  }
}
