import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { ReservedService } from 'src/app/services/reserved.service';

@Component({
  selector: 'app-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.scss'],
})
export class ReservedComponent implements OnInit {
  user!: User;
  activeLink: string = '';

  constructor(private reservedSrv: ReservedService, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentActiveLink();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.reservedSrv.getMe().subscribe((response) => {
      this.user = response;
    });
  }

  activateTab(tabName: string): void {
    this.activeLink = tabName;
  }

  getCurrentActiveLink() {
    const active = this.router.url;
    switch (active) {
      case '/reserved/profile':
        this.activeLink = 'profile';
        break;
      case '/reserved/services':
        this.activeLink = 'services';
        break;
      case '/reserved/expertAppointments':
        this.activeLink = 'expertAppointments';
        break;
      case '/reserved/clientAppointments':
        this.activeLink = 'clientAppointments';
        break;
    }
  }
}
