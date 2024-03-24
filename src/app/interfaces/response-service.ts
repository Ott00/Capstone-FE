import { Pageable, Sort } from './response-users';
import { Service } from './service';

export interface ResponseService {
  content: Service[];
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
