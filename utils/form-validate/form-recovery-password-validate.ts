export const ErrorForm = {
  REQUIRED: 'Обязательно для заполнения',
  EMAIL_INVALID: 'Неправильно указан e-mail',
  MIN(symbols) {
    return `Не менее ${symbols} символов`;
  },
};

type ErrorsType = {
  email?: string,
};

export const validateField = (values) => {
  const errors: ErrorsType = {};
  const patternEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (!values.email) {
    errors.email = ErrorForm.REQUIRED;
  } else if (values.email.length < 6) {
    errors.email = ErrorForm.MIN(6);
  } else if (!patternEmail.test(values.email)) {
    errors.email = ErrorForm.EMAIL_INVALID;
  }

  return errors;
};
