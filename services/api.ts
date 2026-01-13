const { create: createAxios } = require('axios').default;

let API_URL = '';
if (typeof window === 'undefined') {
	// @ts-ignore
	API_URL = config.domain
} else {
	API_URL = process.env.NEXT_PUBLIC_DEV === 'true' ? 'https://prochepetsk.ru' : 'https://prochepetsk.ru';
}

export const createAPI = () => {

  const api = createAxios({
    baseURL: API_URL,
    timeout: 1000 * 20,
    withCredentials: false,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    console.log(`${err.request.path} => ${err.message}`);
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
