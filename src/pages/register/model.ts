import {routes} from '~/shared/routing';

export const currentRoute = routes.auth.register;

currentRoute.open.watch(() => console.log('Register route opened'));
