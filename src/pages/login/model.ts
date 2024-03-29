import {attach, createEvent, createStore, sample} from 'effector';
import {and, every, not, or, reset} from 'patronum';

import * as api from '~/shared/api';
import {routes} from '~/shared/routing';
import {chainAnonymous, sessionRequestFx} from '~/shared/session';

export const currentRoute = routes.auth.login;
export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.search.open,
});

const signInFx = attach({effect: api.signInFx});

export const pageMounted = createEvent();

export const emailChanged = createEvent<string>();
export const passwordChanged = createEvent<string>();
export const formSubmitted = createEvent();

export const $email = createStore('');
export const $emailError = createStore<null | 'empty' | 'invalid'>(null);

export const $password = createStore('');
export const $passwordError = createStore<null | 'empty' | 'invalid'>(null);

export const $error = createStore<api.SignInError | null>(null);

export const $passwordLoginPending = signInFx.pending;
export const $webauthnPending = createStore(false);
export const $formDisabled = or($passwordLoginPending, $webauthnPending);
const $formValid = every({
  stores: [$emailError, $passwordError],
  predicate: null,
});

anonymousRoute.opened.watch(() => console.info('Login route opened'));

reset({
  clock: pageMounted,
  target: [$email, $emailError, $password, $passwordError, $webauthnPending, $error],
});

$email.on(emailChanged, (_, email) => email);

$password.on(passwordChanged, (_, password) => password);

$error.reset(formSubmitted);

sample({
  clock: formSubmitted,
  source: $email,
  fn: (email) => {
    if (isEmpty(email)) return 'empty';
    if (!isEmailValid(email)) return 'invalid';
    return null;
  },
  target: $emailError,
});

sample({
  clock: formSubmitted,
  source: $password,
  fn: (password) => {
    if (isEmpty(password)) return 'empty';
    if (!isPasswordValid(password)) return 'invalid';
    return null;
  },
  target: $passwordError,
});

sample({
  clock: formSubmitted,
  source: {email: $email, password: $password},
  filter: and(not($formDisabled), $formValid),
  target: signInFx,
});

sample({
  clock: signInFx.done,
  target: sessionRequestFx,
});

$error.on(signInFx.failData, (_, error) => error);

function isEmailValid(email: string) {
  return email.includes('@') && email.length > 5;
}

function isPasswordValid(password: string) {
  return password.length > 5;
}

function isEmpty(input: string) {
  return input.trim().length === 0;
}
