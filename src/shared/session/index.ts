import {attach, createStore} from 'effector';

import * as api from '~/shared/api';

import {User} from '../api';

export const sessionRequestFx = attach({effect: api.sessionGetFx});

export const $user = createStore<User | null>(null);

$user.on(sessionRequestFx.doneData, (_, user) => user);

// $user.on(sessionRequestFx.fail, () => null);
