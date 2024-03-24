import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceExplorerComponent } from './performance-explorer.component';

describe('PerformanceExplorerComponent', () => {
  let component: PerformanceExplorerComponent;
  let fixture: ComponentFixture<PerformanceExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceExplorerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
