require('dotenv').config();
const bunyan = require('bunyan');
const serviceAcessToken = require('crypto').randomBytes(16).toString('hex').slice(0, 23);

const log = {
  development: () => {
    return bunyan.createLogger({name: 'tamerbot-weather-development', level: 'debug'});
  },
  production: () => {
    return bunyan.createLogger({name: 'tamerbot-weather-production', level: 'info'});
  },
  test: () => {
    return bunyan.createLogger({name: 'tamerbot-weather-test', level: 'fatal'});
  }
};

module.exports = {
  openweathermap_api_appid: process.env.OPENWEATHERMAP_API_APPID,
  tamerbotApiToken: process.env.TAMERBOT_API_TOKEN,
  serviceAccessToken: serviceAcessToken,
  log: (env) => {
    if (env) return log[env]();
    return log[process.env.NODE_ENV || 'development']();
  }
};
