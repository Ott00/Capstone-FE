import { Pageable, Sort } from './response-users';
import { Review } from './review';

export interface ResponseReview {
  content: Review[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Sort;
  empty: boolean;
}
