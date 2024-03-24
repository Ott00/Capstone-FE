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
  constructor(private reservedSrv: ReservedService, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.reservedSrv.getMe().subscribe((response) => {
      this.user = response;
    });
  }
}
