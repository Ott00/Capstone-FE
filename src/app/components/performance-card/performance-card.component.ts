import { Component, Input, OnInit } from '@angular/core';
import { Service } from 'src/app/interfaces/service';

@Component({
  selector: 'app-performance-card',
  templateUrl: './performance-card.component.html',
  styleUrls: ['./performance-card.component.scss'],
})
export class PerformanceCardComponent implements OnInit {
  @Input() performance!: Service;

  constructor() {}

  ngOnInit(): void {}
}
