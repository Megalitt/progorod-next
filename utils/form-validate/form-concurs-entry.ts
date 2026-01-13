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
  author_name?: string,
  contact_info?: string,
  is_agree?: boolean | string,
  pic_field?: any,
};

export const validateField = (values) => {
  const errors: ErrorsType = {};

  if (!values.author_name) {
    errors.author_name = ErrorForm.REQUIRED;
  }

  if (!values.contact_info) {
    errors.contact_info = ErrorForm.REQUIRED;
  }

  if (!values.is_agree) {
    errors.is_agree = ErrorForm.REQUIRED;
  }

  if (!values.pic_field) {
    errors.pic_field = ErrorForm.REQUIRED;
  }

  return errors;
};
