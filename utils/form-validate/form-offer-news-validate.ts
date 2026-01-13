export const ErrorForm = {
  REQUIRED: 'Обязательно для заполнения',
  MIN(symbols) {
    return `Не менее ${symbols} символов`;
  },
  MAX(symbols) {
    return `Не более ${symbols} символов`;
  },
  MAX_FILES(files) {
    return `Вы можете загрузить не более ${files} файлов`;
  },
  MAX_VIDEO: 'Размер видео не должен быть больше 1Гб',
  MAX_PHOTO: 'Размер фото не должен быть больше 8Мб',
  TYPE_LOAD: 'Возможна загрузка только изображений и видео',
  PHONE: 'Введите корректный номер телефона',
  EMAIL: 'Введите корректный e-mail',
};

type ErrorsType = {
  name?: string,
  contacts?: string,
  description?: string,
  is_agree?: boolean | string,
  is_mine?: boolean | string,
};

type ErrorAskFaq = {
  fio?: string,
  text?: string,
  phone?: string,
  email?: string,
  is_agree?: boolean | string,
};

type ErrorSpecialistFaq = {
  fio?: string,
  position?: string,
  faq_company_id?: string | number,
  my_company?: string,
};

export const validateAskFaqForm = (values) => {
  const telReg = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const errors: ErrorAskFaq = {};

  if (!values.fio) {
    errors.fio = ErrorForm.REQUIRED;
  }

  if (!values.text) {
    errors.text = ErrorForm.REQUIRED;
  }

  if (!values.phone) {
    errors.phone = ErrorForm.REQUIRED;
  } else if (!telReg.test(values.phone)) {
    errors.phone = ErrorForm.PHONE;
  }

  if (!values.email) {
    errors.email = ErrorForm.REQUIRED;
  } else if (!emailReg.test(values.email)) {
    errors.email = ErrorForm.EMAIL;
  }

  if (!values.is_agree) {
    errors.is_agree = ErrorForm.REQUIRED;
  }

  return errors;
};

export const validateSpecialistFaqForm = (values) => {
  const errors: ErrorSpecialistFaq = {};

  if (!values.fio) {
    errors.fio = ErrorForm.REQUIRED;
  }

  if (!values.position) {
    errors.position = ErrorForm.REQUIRED;
  }

  return errors;
};

export const validateField = (values) => {
  const errors: ErrorsType = {};

  if (!values.name) {
    errors.name = ErrorForm.REQUIRED;
  }

  if (!values.contacts) {
    errors.contacts = ErrorForm.REQUIRED;
  }

  if (!values.is_agree) {
    errors.is_agree = ErrorForm.REQUIRED;
  }

  if (!values.is_mine) {
    errors.is_mine = ErrorForm.REQUIRED;
  }

  if (!values.description) {
    errors.description = ErrorForm.REQUIRED;
  } else if (values.description.length < 5) {
    errors.description = ErrorForm.MIN(5);
  } else if (values.description.length > 10000) {
    errors.description = ErrorForm.MAX(10000);
  }

  return errors;
};
