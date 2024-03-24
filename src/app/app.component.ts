import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Capstone-FE';

  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.restore();
  }
}
