import { Category } from './category';
import { Pageable, Sort } from './response-users';

export interface ResponseCategory {
  content: Category[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
