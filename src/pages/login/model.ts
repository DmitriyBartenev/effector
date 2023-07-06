import { createStore, createEvent, sample, attach } from 'effector';
import { or, not } from 'patronum';

import * as api from 'shared/api';

const signInFx = attach({ effect: api.signInFx });

export const emailChanged = createEvent<string>();
export const passwordChanged = createEvent<string>();
export const formSubmitted = createEvent();

export const $email = createStore('');
export const $emailError = createStore<null | 'empty' | 'invalid'>(null);
export const $password = createStore('');
export const $passwordError = createStore<null | 'empty' | 'invalid'>(null);

export const $passwordLoginPending = signInFx.pending;
export const $webauthnPending = createStore(false);
export const $formDisabled = or($passwordLoginPending, $webauthnPending);
export const $error = createStore<api.SignInError | null>(null);

$email.on(emailChanged, (_, email) => email);

$password.on(passwordChanged, (_, password) => password);

$error.reset(formSubmitted);

sample({
  clock: formSubmitted,
  source: { email: $email, password: $password },
  filter: not($formDisabled),
  target: signInFx,
});

$error.on(signInFx.failData, (_, error) => error);

// handle signIn errors
// validate email
// validate password
// reset stores
