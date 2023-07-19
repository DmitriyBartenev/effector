import {routes} from '~/shared/routing';

export const currentRoute = routes.search;

currentRoute.open.watch(() => console.info('Search route opened'));

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
 * $sessionLoaded === true
 * sessionRequestFx
 * currentRoute.closed
 * sessionRequestFx.done /.fail
 * ignore / do nothing
 */
