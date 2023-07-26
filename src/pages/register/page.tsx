import {
  Anchor,
  Button,
  Container,
  Group,
  Input,
  Paper,
  PasswordInput,
  PinInput,
  Space,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import {IconAt, IconLock, IconPhone, IconUser} from '@tabler/icons-react';
import {Link} from 'atomic-router-react';
import {useUnit} from 'effector-react';
import {FormEventHandler, useEffect, useId} from 'react';
import {IMaskInput} from 'react-imask';

import {routes} from '~/shared/routing';

import {pageMounted} from '../login/model';
import {
  $confirmPhoheFormDisabled,
  $confirmPhone,
  $registrationFormDisabled,
  $signUpError,
  codeField,
  confirmPhoneSubmitted,
  emailField,
  passwordField,
  phoneField,
  registrationFormSubmitted,
  usernameField,
} from './model';

export const RegisterPage = () => {
  const [confirmPhone, registrationFormDisabled] = useUnit([
    $confirmPhone,
    $registrationFormDisabled,
  ]);

  useEffect(() => {
    pageMounted();
  }, []);

  const onFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    registrationFormSubmitted();
  };

  if (confirmPhone) return <ConfirmPhoneForm />;

  return (
    <>
      <Container size={420} my={40} w="100%" h="100vh">
        <Title
          align="center"
          sx={(theme) => ({fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900})}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{' '}
          <Anchor size="sm" component={Link} to={routes.auth.login}>
            Log in
          </Anchor>
        </Text>

        <Paper
          component="form"
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          onSubmit={onFormSubmit}
        >
          <Username />
          <Email />
          <Password />
          <Phone />
          <ErrorView />
          <Button fullWidth mt="xl" type="submit" disabled={registrationFormDisabled}>
            Sign Up
          </Button>
        </Paper>
      </Container>
    </>
  );
};

const usernameErrorText = {
  empty: 'Имя пользователя не может быть пустым',
};

function Username() {
  const [username, usernameError, registrationFormDisabled] = useUnit([
    usernameField.$value,
    usernameField.$error,
    $registrationFormDisabled,
  ]);

  return (
    <TextInput
      label="username"
      placeholder="username"
      icon={<IconUser size="0.8rem" />}
      mt="md"
      value={username}
      onChange={(event) => usernameField.changed(event.target.value)}
      disabled={registrationFormDisabled}
      error={usernameError ? usernameErrorText[usernameError] : null}
    />
  );
}

const emailErrorText = {
  empty: 'Email не может быть пустым',
  invalid: 'Неверный формат e-mail',
};

function Email() {
  const [email, emailError, registrationFormDisabled] = useUnit([
    emailField.$value,
    emailField.$error,
    $registrationFormDisabled,
  ]);

  return (
    <TextInput
      label="email"
      placeholder="email"
      icon={<IconAt size="0.8rem" />}
      mt="md"
      value={email}
      onChange={(event) => emailField.changed(event.target.value)}
      disabled={registrationFormDisabled}
      error={emailError ? emailErrorText[emailError] : null}
    />
  );
}

const passwordErrorText = {
  empty: 'Пароль не может быть пустым',
  invalid: 'Пароль слишком короткий',
};

function Password() {
  const [password, passwordError, registrationFormDisabled] = useUnit([
    passwordField.$value,
    passwordField.$error,
    $registrationFormDisabled,
  ]);

  return (
    <PasswordInput
      label="password"
      placeholder="your password"
      mt="md"
      icon={<IconLock size="0.8rem" />}
      value={password}
      onChange={(event) => passwordField.changed(event.target.value)}
      disabled={registrationFormDisabled}
      error={passwordError ? passwordErrorText[passwordError] : null}
    />
  );
}

const phoneErrorText = {
  empty: 'Номер мобильного телефона не может быть пустым',
};

function Phone() {
  const [phone, phoneError, registrationFormDisabled] = useUnit([
    phoneField.$value,
    phoneField.$error,
    $registrationFormDisabled,
  ]);

  return (
    <Input.Wrapper label="phone" mt="md" error={phoneError ? phoneErrorText[phoneError] : null}>
      <Input
        component={IMaskInput}
        mask="+7 (000) 000-00-00"
        placeholder="Your phone"
        icon={<IconPhone size="0.8rem" />}
        value={phone}
        disabled={registrationFormDisabled}
        error={phoneError ? phoneErrorText[phoneError] : null}
        onChange={(event: any) => phoneField.changed(event.target.value)}
      />
    </Input.Wrapper>
  );
}

function ErrorView() {
  const error = useUnit($signUpError);

  if (!error) {
    return <Space h="xl" />;
  }

  if (error?.error === 'invalid_credentials') {
    return <Text c="red">Неверный пароль и/или почта</Text>;
  }

  if (error?.error === 'user_exists') {
    return <Text c="red">Неверный пароль и/или почта</Text>;
  }

  return <Text c="red">Что-то пошло не так, попробуйте еще раз</Text>;
}

function ConfirmPhoneForm() {
  const [code, confirmPhoheFormDisabled] = useUnit([codeField.$value, $confirmPhoheFormDisabled]);

  return (
    <Container size={420} my={40} w="100%" h="100vh">
      <Title align="center">Validate your phone</Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your code from sms
      </Text>

      <Group position="center" mt="lg">
        <PinInput
          value={code}
          length={6}
          disabled={confirmPhoheFormDisabled}
          onChange={(value) => {
            codeField.changed(value);
            if (value.length === 6) {
              confirmPhoneSubmitted();
            }
          }}
        />
      </Group>
    </Container>
  );
}
