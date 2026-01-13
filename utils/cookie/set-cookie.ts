export const setCookie = (name, value, options = {}) => {
  // eslint-disable-next-line no-param-reassign
  options = {
    path: '/',
    ...options,
  };

  // @ts-ignore
  if (options.expires instanceof Date) {
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const optionKey in options) {
    updatedCookie += `; ${optionKey}`;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  }

  document.cookie = updatedCookie;
};
