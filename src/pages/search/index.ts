import {createRouteView} from 'atomic-router-react';

import {PageLoader} from '~/shared/ui';

import {authorizedRoute, currentRoute} from './model';
import SearchPage from './page';

const AuthorizedView = createRouteView({
  route: authorizedRoute,
  component: SearchPage,
  otherwise: PageLoader,
});

export const SearchRoute = {
  view: AuthorizedView,
  route: currentRoute,
};
