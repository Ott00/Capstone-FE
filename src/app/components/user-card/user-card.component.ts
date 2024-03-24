import { Component, Input, OnInit } from '@angular/core';
import { RegisterData } from 'src/app/auth/interfaces/register-data';
import { ContentUser } from 'src/app/interfaces/response-users';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() user!: ContentUser;
  constructor() {}

  ngOnInit(): void {}
}
