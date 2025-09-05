const axios = require('axios').default;
const Axios = (url, method, data = {}, headers = {}, proxy = null) => {
  const config = {
    url,
    method,
    maxBodyLength: Infinity,
    ...headers,
  };
  if (method.toLowerCase() !== 'get') {
    config.data = data;
  }
  if (proxy) {
    config.httpsAgent = proxy;
  }

  return axios(config);
};

module.exports = Axios;
