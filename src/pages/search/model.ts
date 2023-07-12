import { routes } from '~/shared/routing';

export const currentRoute = routes.search;

currentRoute.open.watch(() => console.log('Search route opened'));
