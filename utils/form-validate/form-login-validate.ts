export const ErrorForm = {
  REQUIRED: 'Обязательно для заполнения',
  MIN(symbols) {
    return `Не менее ${symbols} символов`;
  },
};

type ErrorsType = {
  username?: string,
  password?: string,
};

export const validateField = (values) => {
  const errors: ErrorsType = {};

  if (!values.username) {
    errors.username = ErrorForm.REQUIRED;
  }

  if (!values.password) {
    errors.password = ErrorForm.REQUIRED;
  } else if (values.password.length < 6) {
    errors.password = ErrorForm.MIN(6);
  }

  return errors;
};
