import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/interfaces/review';

@Component({
  selector: 'app-review-element',
  templateUrl: './review-element.component.html',
  styleUrls: ['./review-element.component.scss'],
})
export class ReviewElementComponent implements OnInit {
  @Input() review!: Review;
  isTextClamped: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  toggleTextClamped() {
    this.isTextClamped = !this.isTextClamped;
  }
}
