import {authorizedRoute, currentRoute} from './model';
import SearchPage from './page';

export const SearchRoute = {
  view: SearchPage,
  route: currentRoute,
};
