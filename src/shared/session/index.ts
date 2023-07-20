import {attach, createStore} from 'effector';

import * as api from '~/shared/api';

import {User} from '../api';

export enum AuthStatus {
  Initial = 0,
  Pending,
  Anonymous,
  Authenticated,
}

export const sessionRequestFx = attach({effect: api.sessionGetFx});

export const $user = createStore<User | null>(null);
export const $authenticationStatus = createStore(AuthStatus.Initial);

$authenticationStatus.on(sessionRequestFx, (status) => {
  if (status === AuthStatus.Initial) return AuthStatus.Pending;
  return status;
});

$user.on(sessionRequestFx.doneData, (_, user) => user);
$authenticationStatus.on(sessionRequestFx.doneData, () => AuthStatus.Authenticated);

$authenticationStatus.on(sessionRequestFx.fail, () => AuthStatus.Anonymous);

// $user.on(sessionRequestFx.fail, () => null);
