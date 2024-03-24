import { Category } from './category';
import { ContentUser } from './response-users';

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string;
  freelancer: ContentUser;
  category: Category;
}
