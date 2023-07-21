import {routes} from '~/shared/routing';
import {chainAuthorized} from '~/shared/session';

export const currentRoute = routes.search;
const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.auth.login.open,
});

authorizedRoute.open.watch(() => console.info('Search authorized route opened'));
