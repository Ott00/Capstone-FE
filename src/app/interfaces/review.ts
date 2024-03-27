import { Service } from './service';
import { User } from './user';

export interface Review {
  id: string;
  evaluation: number;
  title: string;
  comment: string;
  date: string;
  lastEditDate: string;
  edited: boolean;
  performance: Service;
  client: User;
}
