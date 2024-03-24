import { Component, OnInit } from '@angular/core';
import { ContentUser } from 'src/app/interfaces/response-users';
import { ExpertsService } from 'src/app/services/experts.service';

@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss'],
})
export class ExpertsComponent implements OnInit {
  users: ContentUser[] = [];
  experts: ContentUser[] = [];
  constructor(private expertSrv: ExpertsService) {}

  ngOnInit(): void {
    this.getExperts();
  }

  getExperts(): void {
    this.expertSrv.getUsers(0, 100).subscribe((response) => {
      this.users = response.content;
      // console.log(this.users);
      this.filterExpertFromUser();
      // console.log(this.experts);
    });
  }

  filterExpertFromUser(): void {
    this.users.forEach((user) => {
      if (user.role === 'FREELANCER') {
        this.experts.push(user);
      }
    });
  }
}
