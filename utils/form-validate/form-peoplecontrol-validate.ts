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
};

type ErrorsType = {
  author_anon_name?: string,
  category_id?: string,
  text?: string,
  is_agree?: boolean | string,
};

export const validateField = (values) => {
  const errors: ErrorsType = {};

  if (!values.author_anon_name) {
    errors.author_anon_name = ErrorForm.REQUIRED;
  }

  if (!values.category_id || values.category_id === 0) {
    errors.category_id = ErrorForm.REQUIRED;
  }

  if (!values.is_agree) {
    errors.is_agree = ErrorForm.REQUIRED;
  }

  if (!values.text) {
    errors.text = ErrorForm.REQUIRED;
  } else if (values.text.length < 5) {
    errors.text = ErrorForm.MIN(5);
  } else if (values.text.length > 10000) {
    errors.text = ErrorForm.MAX(10000);
  }

  return errors;
};
