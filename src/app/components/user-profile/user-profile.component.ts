import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { ReservedService } from 'src/app/services/reserved.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user!: User;
  showPassword!: boolean;
  constructor(private reservedSrv: ReservedService) {}

  ngOnInit(): void {
    this.getMe();
  }

  getMe() {
    this.reservedSrv.getMe().subscribe((response) => {
      this.user = response;
    });
  }

  editMe(registerForm: NgForm) {
    console.log(registerForm.value);
    try {
      this.reservedSrv
        .updateMe(registerForm.value)
        .subscribe(() => this.getMe());
    } catch (error: any) {
      alert(error);
    }
  }

  showPasswordOrNot() {
    this.showPassword = !this.showPassword;
  }
}
