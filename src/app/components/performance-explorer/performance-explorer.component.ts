import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { Service } from 'src/app/interfaces/service';
import { PerfomancesService } from 'src/app/services/performances.service';
import { ReservedService } from 'src/app/services/reserved.service';

@Component({
  selector: 'app-performance-explorer',
  templateUrl: './performance-explorer.component.html',
  styleUrls: ['./performance-explorer.component.scss'],
})
export class PerformanceExplorerComponent implements OnInit {
  originalPerformances: Service[] = [];
  performances: Service[] = [];
  categories: Category[] = [];

  //Filter Property
  selectedCategory: string = '';
  selectedPrice: string = '';

  //Search
  searchInput: string = '';

  constructor(
    private performancesSrv: PerfomancesService,
    private reservedSrv: ReservedService
  ) {}

  ngOnInit(): void {
    this.getPerfomances();
    this.getCategories();
  }

  getPerfomances(): void {
    this.performancesSrv.getPerfomances().subscribe((response) => {
      this.originalPerformances = response.content;
      this.performances = response.content;
    });
  }

  getCategories() {
    this.reservedSrv.getCategories().subscribe((response) => {
      this.categories = response.content;
    });
  }

  applyFilter() {
    if (this.selectedCategory === '' && this.selectedPrice === '') {
      this.performances = this.originalPerformances;
    } else {
      this.performancesSrv
        .getPerformancesFiltered(this.selectedPrice, this.selectedCategory)
        .subscribe((response) => {
          this.performances = response.content;
        });
    }
  }

  searchByInput() {
    this.performancesSrv
      .searchPerformanceByInput(this.searchInput)
      .subscribe((response) => {
        this.performances = response.content;
      });
  }
}
