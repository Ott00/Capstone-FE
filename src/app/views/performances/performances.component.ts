import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/interfaces/service';
import { PerfomancesService } from 'src/app/services/performances.service';

@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrls: ['./performances.component.scss'],
})
export class PerformancesComponent implements OnInit {
  performances: Service[] = [];
  constructor(private performancesSrv: PerfomancesService) {}

  ngOnInit(): void {
    this.getPerfomances();
  }

  getPerfomances(): void {
    this.performancesSrv.getPerfomances().subscribe((response) => {
      this.performances = response.content;
    });
  }

  openPerformance(id: string) {}
}
