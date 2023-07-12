import { createRoutesView } from 'atomic-router-react';

import { SearchRoute } from './search';
import { RegisterRoute } from './register';
import { LoginRoute } from './login';

export const Pages = createRoutesView({
  routes: [SearchRoute, RegisterRoute, LoginRoute],
});
