import {chainRoute, RouteInstance, RouteParams, RouteParamsAndQuery} from 'atomic-router';
import {createEvent, Effect, Event, sample} from 'effector';

import {routes} from '~/shared/routing';
import {$authenticationStatus, AuthStatus, sessionRequestFx} from '~/shared/session';

export const currentRoute = routes.search;
const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.auth.login.open,
});

authorizedRoute.open.watch(() => console.info('Search authorized route opened'));

interface ChainParams<Params extends RouteParams> {
  otherwise?: Event<void> | Effect<void, any, any>;
}

function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>,
  {otherwise}: ChainParams<Params> = {},
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAnonymous = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionRequestFx,
  });

  sample({
    clock: [alreadyAnonymous, sessionRequestFx.fail],
    source: {params: route.$params, query: route.$query},
    filter: route.$isOpened,
    target: sessionReceivedAnonymous,
  });

  if (otherwise) {
    sample({
      clock: sessionReceivedAnonymous,
      target: otherwise as Event<void>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthenticated, sessionRequestFx.done],
    cancelOn: alreadyAnonymous,
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
