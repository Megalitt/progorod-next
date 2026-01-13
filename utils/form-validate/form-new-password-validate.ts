export const ErrorForm = {
  REQUIRED: 'Обязательно для заполнения',
  MIN(symbols) {
    return `Не менее ${symbols} символов`;
  },
};

type ErrorsType = {
  password?: string,
};

export const validateField = (values) => {
  const errors: ErrorsType = {};

  if (!values.password) {
    errors.password = ErrorForm.REQUIRED;
  } else if (values.password.length < 6) {
    errors.password = ErrorForm.MIN(6);
  }

  return errors;
};
