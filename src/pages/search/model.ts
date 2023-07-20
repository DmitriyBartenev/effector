import {chainRoute, RouteInstance, RouteParams, RouteParamsAndQuery} from 'atomic-router';
import {createEvent, sample} from 'effector';

import {routes} from '~/shared/routing';
import {$authenticationStatus, AuthStatus} from '~/shared/session';

export const currentRoute = routes.search;
const authorizedRoute = chainAuthorized(currentRoute);

currentRoute.open.watch(() => console.info('Search route opened'));

function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>,
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  });

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: alreadyAuthenticated,
  });
}

/*
 * currentRoute.opened
 * $sessionLoaded === true
 * $authorized === true
 * authorizedRoute.opened
 */

/*
 * currentRoute.opened
 * $sessionLoaded === true
 * $authorized === false
 * cancel => redirect to /login
 */

/*
 * currentRoute.opened
 * $sessionLoaded === false
 * sessionRequestFx
 * sessionRequestFx.done
 * authorizedRoute.opened
 */

/*
 * currentRoute.opened
 * $sessionLoaded === false
 * sessionRequestFx
 * sessionRequestFx.fail
 * cancel => redirect to /login
 */

/*
 * currentRoute.opened
 * $sessionLoaded === true
 * sessionRequestFx
 * currentRoute.closed
 * sessionRequestFx.done /.fail
 * ignore / do nothing
 */
