require('dotenv').config();
const bunyan = require('bunyan');

const log = {
  development: () => {
    return bunyan.createLogger({name: 'tamerbot-development', level: 'debug'});
  },
  production: () => {
    return bunyan.createLogger({name: 'tamerbot-production', level: 'info'});
  },
  test: () => {
    return bunyan.createLogger({name: 'tamerbot-test', level: 'fatal'});
  }
};

module.exports = {
  openweathermap_api_appid: process.env.OPENWEATHERMAP_API_APPID,
  log: (env) => {
    if (env) return log[env]();
    return log[process.env.NODE_ENV || 'development']();
  }
};
