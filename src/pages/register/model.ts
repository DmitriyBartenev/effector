import {attach, createEvent, createStore, Event, sample} from 'effector';
import {and, every, not, reset} from 'patronum';

import * as api from '~/shared/api';
import {routes} from '~/shared/routing';
import {chainAnonymous, sessionRequestFx} from '~/shared/session';

export const currentRoute = routes.auth.register;
export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.search.open,
});

const signUpFx = attach({effect: api.signUpFx});
const confirmPhoneFx = attach({effect: api.confirmPhoneFx});

export const registrationFormSubmitted = createEvent();
export const confirmPhoneSubmitted = createEvent();
export const pageMounted = createEvent();

export const $signUpError = createStore<api.SignUpError | null>(null);
export const $confirmPhone = createStore(false);

export const emailField = createField({
  defaultValue: '',
  resetOn: anonymousRoute.closed,
  validate: {
    on: registrationFormSubmitted,
    fn(email) {
      if (isEmpty(email)) return 'empty';
      if (!isEmailValid(email)) return 'invalid';
      return null;
    },
  },
});

export const passwordField = createField({
  defaultValue: '',
  resetOn: anonymousRoute.closed,
  validate: {
    on: registrationFormSubmitted,
    fn(password) {
      if (isEmpty(password)) return 'empty';
      if (!isPasswordValid(password)) return 'invalid';
      return null;
    },
  },
});

export const phoneField = createField({
  defaultValue: '',
  resetOn: anonymousRoute.closed,
  validate: {
    on: registrationFormSubmitted,
    fn(phone) {
      if (isEmpty(phone)) return 'empty';
      return null;
    },
  },
});

export const usernameField = createField({
  defaultValue: '',
  resetOn: anonymousRoute.closed,
  validate: {
    on: registrationFormSubmitted,
    fn(username) {
      if (isEmpty(username)) return 'empty';
      return null;
    },
  },
});

export const codeField = createField({
  defaultValue: '',
  resetOn: anonymousRoute.closed,
});

export const $registrationFormDisabled = signUpFx.pending;
export const $confirmPhoheFormDisabled = confirmPhoneFx.pending;
const $registrationFormValid = every({
  // @ts-ignore
  stores: [emailField.$error, passwordField.$error, usernameField.$error, phoneField.$error],
  predicate: null,
});

$signUpError.reset(registrationFormSubmitted);

sample({
  clock: registrationFormSubmitted,
  source: {
    email: emailField.$value,
    password: passwordField.$value,
    phone: phoneField.$value,
    username: phoneField.$value,
  },
  filter: and(not($registrationFormDisabled), $registrationFormValid),
  target: signUpFx,
});

$signUpError.on(signUpFx.failData, (_, error) => error);
$confirmPhone.on(signUpFx.done, () => true);

sample({
  clock: confirmPhoneSubmitted,
  source: {code: codeField.$value},
  filter: not($registrationFormDisabled),
  target: confirmPhoneFx,
});

sample({
  clock: confirmPhoneFx.done,
  target: sessionRequestFx,
});

reset({
  clock: anonymousRoute.closed,
  target: [codeField.$value, $signUpError, $confirmPhone],
});

function isEmailValid(email: string) {
  return email.includes('@') && email.length > 5;
}

function isPasswordValid(password: string) {
  return password.length > 5;
}

function isEmpty(input: string) {
  return input.trim().length === 0;
}

interface CreateField<Value, Error> {
  defaultValue: Value;
  validate?: {
    fn: (value: Value) => Error | null;
    on: Event<void>;
  };
  resetOn?: Event<void> | Array<Event<any>>;
}

function createField<Value, Error>(options: CreateField<Value, Error>) {
  const $value = createStore(options.defaultValue);
  const $error = createStore<Error | null>(null);
  const changed = createEvent<Value>();

  $value.on(changed, (_, value) => value);

  if (options.validate) {
    sample({
      clock: options.validate.on,
      source: $value,
      fn: options.validate.fn,
      target: $error,
    });
  }

  if (options.resetOn) {
    $value.reset(options.resetOn as Array<Event<any>>);
    $error.reset(options.resetOn as Array<Event<any>>);
  }

  return {$value, changed, $error};
}

currentRoute.open.watch(() => console.log('Register route opened'));
