

const omitDeep = require('omit-deep');
const { createLogger, format, transports } = require('winston');
const lodash = require('lodash');
const deepdash = require('deepdash');
const _ = deepdash(lodash); // lodash extended with deep search
const path = require('path')
const express = require('express');

const app = express();


const customFormat = format.combine(
  format.timestamp(),
  format((info) => {
    if (app.currentRoute) {  // You need to track the route in middleware
      info.route = app.currentRoute;

      console.log("this is logger js route testing", info.route)
    }
    return info;
  })(),

  format.json()
);
const levelFilter = (level) => {
  return format((info) => {
    return info.level === level ? info : false;
  })();
};

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  // format: format.combine(format.timestamp(), format.json()),
  format: customFormat,
  transports: [
    new transports.File({
      filename: path.join(__dirname, 'logs', 'responses.log'), format: format.combine(
        levelFilter('info'),
        customFormat
      )
    }),
    new transports.File({
      filename: path.join(__dirname, 'logs', 'error.log'), format: format.combine(
        levelFilter('error'),  // keep only errors
        customFormat           // still run your timestamp/route/json formatter
      )
    })
  ]
});

function deepFindAll(error, keys) {
  if (!error || !keys || !Array.isArray(keys) || keys.length === 0) return {};
  const result = {};
  for (const key of keys) {
    const value = _.findValueDeep(error, (val, k) => {
      if (typeof k === 'string') {
        return k.toLowerCase() === key.toLowerCase();
      }
      return false;
    });
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}


function cleanErrorObject(error) {
  if (!error) return { message: 'Unknown error' };

  const ALWAYS_OMIT = [
    'socket', '_readableState', '_events', '_writableState',
    'rawHeaders', 'rawTrailers', 'res', 'client',
    'next', 'baseUrl', '_parsedUrl', 'route', 
  ];




  let cleanedError = {};
  const KEYS_TO_EXTRACT_DEEPLY = [
    // Request basics
    'method',
    'url',
    'originalUrl',
    'params',
    'query',
    'httpVersion',
    'headers',
    'user-agent',
    'email',
    'details',
    'body',

    // Auth/session info
    'authorization',
    'token',
    'session',
    'user',
    'walletAddress',
    'address',
    'chain',
    'chainId',

    // Axios / Moralis-specific
    'status',
    'statusCode',
    'code',
    'message',
    'data',
    'responseData',
    'response',
    'request',
    'config',

    // Moralis API specifics
    'result',
    'cursor',
    'page',
    'page_size',
    'total',

    // Device/client info
    'ip',
    'origin',
    'referer',
    'locale',
    'platform',
    'device',

    // Misc useful
    'error',
    'stack',
    'context',
    'debug',
    'source',
    'env',
    'functionName',
    'timestamp',

    // Joi validation specifics
    'isJoi',
    'name',         // usually "ValidationError"
    'details',      // array of validation error details
    '_original'     // original object that failed validation
  ];
  if (error) {
    cleanedError.message = error
  }

  // Basic error fields
  if (error instanceof Error || (error.message && error.stack)) {
    cleanedError.message = error.message;
    cleanedError.stack = error.stack;
  }


  // Axios-specific
  if (error.isAxiosError || error.name === 'AxiosError') {
    const { config, response, code } = error;
    cleanedError.code = code;
    cleanedError.status = response?.status;
    cleanedError.method = config?.method;
    cleanedError.url = config?.url;

    if (response?.data) {
      cleanedError.responseData = response.data;
    }
  }

  // Deep extract keys (works even for nested request structures)
  const deepValues = deepFindAll(error, KEYS_TO_EXTRACT_DEEPLY) || undefined;
  if (deepValues.headers) {
    deepValues.headers = omitDeep(deepValues.headers, ['cookie', 'authorization']);
  }
  cleanedError.request = deepValues;

  // Final cleanup
  cleanedError = omitDeep(cleanedError, ALWAYS_OMIT);
  return cleanedError;
}

logger.logError = function (error, BaseData = {}) {
  const cleanedError = cleanErrorObject(error);
  this.error({
    ...cleanedError,
    ...BaseData
  });
};

module.exports = logger;
