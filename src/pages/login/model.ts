import { createStore, createEvent, sample } from 'effector';
import { or, not } from 'patronum';
import { SignInError, signInFx } from 'shared/api';

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
export const $error = createStore<SignInError | null>(null);

$email.on(emailChanged, (_, email) => email);

$password.on(passwordChanged, (_, password) => password);

sample({
  clock: formSubmitted,
  source: { email: $email, password: $password },
  filter: not($formDisabled),
  target: signInFx,
});
