import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword!: boolean;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    // console.log(loginForm);
    try {
      this.authSrv.login(loginForm.value).subscribe(() => {
        this.router.navigate(['/reserved/profile']);
      });
    } catch (error) {
      alert('Login errato!');
      console.log(error);
      this.router.navigate(['/login']);
    }
  }

  showPasswordOrNot() {
    this.showPassword = !this.showPassword;
  }

  goRegister() {
    this.router.navigate(['/register']);
  }
}
