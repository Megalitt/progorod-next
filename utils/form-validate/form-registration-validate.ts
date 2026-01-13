export const ErrorForm = {
  REQUIRED: 'Обязательно для заполнения',
  EMAIL_INVALID: 'Неправильно указан e-mail',
  MIN(symbols) {
    return `Не менее ${symbols} символов`;
  },
};

type ErrorsType = {
  username?: string,
  nick?: string,
  email?: string,
  password?: string,
  is_agree?: boolean | string,
};

export const validateField = (values) => {
  const errors: ErrorsType = {};
  const patternEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (!values.username) {
    errors.username = ErrorForm.REQUIRED;
  } else if (values.username.length < 3) {
    errors.username = ErrorForm.MIN(3);
  }

  if (!values.nick) {
    errors.nick = ErrorForm.REQUIRED;
  } else if (values.nick.length < 6) {
    errors.nick = ErrorForm.MIN(6);
  }

  if (!values.email) {
    errors.email = ErrorForm.REQUIRED;
  } else if (values.email.length < 6) {
    errors.email = ErrorForm.MIN(6);
  } else if (!patternEmail.test(values.email)) {
    errors.email = ErrorForm.EMAIL_INVALID;
  }

  if (!values.password) {
    errors.password = ErrorForm.REQUIRED;
  } else if (values.password.length < 6) {
    errors.password = ErrorForm.MIN(6);
  }

  if (!values.is_agree) {
    errors.is_agree = ErrorForm.REQUIRED;
  }

  return errors;
};
