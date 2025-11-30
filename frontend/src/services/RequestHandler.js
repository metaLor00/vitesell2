import axios from 'axios';
import {
  BASE_API_URL,
  REQUEST_TIMEOUT,
  MAX_CONTENT_LENGTH,
} from '../constants/App.js';

function getToken() {
  return '112427|5hqoYnnBS9WAy7eg9O7cDY5PKQaLZ9V6jJBwG4Ey8e378dd6'; // Implement your token retrieval logic here
}

function getHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

const RequestHandler = axios.create({
  // Base URL for all requests
  baseURL: BASE_API_URL,

  // Number of milliseconds before the request times out
  timeout: Number(REQUEST_TIMEOUT),

  // Custom headers to be sent with every request
  headers: getHeaders(),

  // Indicates whether or not cross-site Access-Control requests should be made using credentials
  withCredentials: false,

  // Indicates the type of data that the server will respond with
  // Options are: 'arraybuffer', 'document', 'json', 'text', 'stream', 'blob' (browser only)
  responseType: 'json',

  // Indicates encoding to use for decoding responses (default: utf8)
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8',

  // The name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN',

  // The name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN',

  // Function that will be called for handling upload progress events
  onUploadProgress: (progressEvent) => {
    // Handle upload progress
    // progressEvent.loaded: number of bytes uploaded
    // progressEvent.total: total number of bytes to be uploaded
  },

  // Function that will be called for handling download progress events
  onDownloadProgress: (progressEvent) => {
    // Handle download progress
    // progressEvent.loaded: number of bytes downloaded
    // progressEvent.total: total number of bytes to be downloaded
  },

  // Defines the max size of the http response content in bytes allowed
  maxContentLength: Number(MAX_CONTENT_LENGTH),

  // Defines whether to resolve or reject the promise for a given HTTP response status code
  // If `validateStatus` returns `true`, the promise will be resolved; otherwise, it will be rejected
  validateStatus: (status) => status >= 200 && status < 300,

  // // `transformRequest` allows changes to the request data before it is sent to the server
  // // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
  // transformRequest: [function (data, headers) {
  //     // Do whatever you want to transform the data
  //     return data;
  // }],

  // // `transformResponse` allows changes to the response data to be made before it is passed to then/catch
  // transformResponse: [function (data) {
  //     return RequestHandler.transformResponse(data);
  // }],

  // // `paramsSerializer` is an optional function in charge of serializing `params`
  // paramsSerializer: function (params) {
  //     return Qs.stringify(params, {arrayFormat: 'brackets'})
  // },

  // // `adapter` allows custom handling of requests which makes testing easier.
  // // Return a promise and supply a valid response (see lib/adapters/README.md).
  // adapter: function (config) {
  //     /* ... */
  // },

  // // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // // This will set an `Authorization` header, overwriting any existing
  // // `Authorization` custom headers you have set using `headers`.
  // // Please note that only HTTP Basic auth is configurable through this parameter.
  // // For Bearer tokens and such, use `Authorization` custom headers instead.
  // auth: {
  //     username: 'janedoe',
  //     password: 's00pers3cret'
  // },

  // // `responseEncoding` indicates encoding to use for decoding responses (default: utf8)
  // // Note: Ignored for `responseType` of 'stream' or client-side requests
  // responseEncoding: 'utf8',

  // // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  // xsrfCookieName: 'XSRF-TOKEN', // default

  // // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  // xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // // If set to 0, no redirects will be followed.
  // maxRedirects: 5, // default

  // // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // // and https requests, respectively, in node.js. This allows options to be added like
  // // `keepAlive` that are not enabled by default.
  // httpAgent: new http.Agent({ keepAlive: true }),
  // httpsAgent: new https.Agent({ keepAlive: true }),

  // // `proxy` defines the hostname, port, and protocol of the proxy server.
  // // You can also define your proxy using the conventional `http_proxy` and
  // // `https_proxy` environment variables. If you are using environment variables
  // // for your proxy configuration, you can also define a `no_proxy` environment
  // // variable as a comma-separated list of domains that should not be proxied.
  // // Use `false` to disable proxies, ignoring environment variables.
  // // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
  // // supplies credentials.
  // // This will set an `Proxy-Authorization` header, overwriting any existing
  // // `Proxy-Authorization` custom headers you have set using `headers`.
  // proxy: {
  //     protocol: 'https',
  //     host: '127.0.0.1',
  //     port: 9000,
  //     auth: {
  //         username: 'mikeymike',
  //         password: 'rapunz3l'
  //     }
  // },

  // // `cancelToken` specifies a cancel token that can be used to cancel the request
  // // (see Cancellation section below for details)
  // cancelToken: new CancelToken(function (cancel) {
  // }),

  // // `decompress` indicates whether or not the response body should be decompressed
  // // automatically. If set to `true` will also remove the 'content-encoding' header
  // // from the responses objects of all decompressed responses
  // // - Node only (XHR cannot turn off decompression)
  // decompress: true // default
});

// Request interceptor
RequestHandler.interceptors.request.use(
  (config) => {
    // Modify request config here (e.g., add headers, authentication tokens)
    config.headers = { ...config.headers, ...getHeaders() };
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  },
);

// Response interceptor
RequestHandler.interceptors.response.use(
  (response) => {
    // Handle successful responses
    if (response.status >= 200 && response.status < 300) {
      if (response?.data && !response.data.status) {
        console.error(response.data.message);
      }

      return RequestHandler.transformResponse(response);
    }

    return Promise.reject(response);
  },
  (error) => {
    // Handle response errors here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error data:', error.response?.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }

    return Promise.reject(error);
  },
);

/**
 * Transforms the Axios response into usable data based on the content type and response type.
 * @param {AxiosResponse} response - The Axios response object
 * @returns {Promise<any>} - The transformed data
 */
RequestHandler.transformResponse = function (response) {
  const contentType = response.headers['content-type'];
  const responseType = response.config.responseType;

  try {
    if (responseType === 'arraybuffer' || responseType === 'blob') {
      // Handle binary data
      return response.data;
    }

    if (contentType.includes('application/json')) {
      // Parse JSON response
      return typeof response.data === 'string'
        ? JSON.parse(response.data)
        : response.data;
    }

    if (contentType.includes('text/html')) {
      // Return HTML content as string
      return response.data.toString();
    }

    if (contentType.includes('text/plain')) {
      // Return plain text
      return response.data.toString();
    }

    if (
      contentType.includes('application/xml') ||
      contentType.includes('text/xml')
    ) {
      // Parse XML response (you might want to use a XML parser library here)
      return response.data.toString();
    }

    // For other content types, return the raw data
    return response.data;
  } catch (error) {
    console.error('Error transforming response:', error);
    throw new Error('Failed to transform response data');
  }
};

// Custom methods that use the RequestHandler
RequestHandler.getWithFullResponse = async function (url, config = {}) {
  return this.get(url, config);
};

RequestHandler.postWithFullResponse = async function (url, data, config = {}) {
  return this.post(url, data, config);
};

RequestHandler.putWithFullResponse = async function (url, data, config = {}) {
  return this.put(url, data, config);
};

RequestHandler.deleteWithFullResponse = async function (url, config = {}) {
  return this.delete(url, config);
};

export default RequestHandler;
