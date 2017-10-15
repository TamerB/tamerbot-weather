'use strict';

const express = require('express');
const service = express();
const request = require('superagent');

module.exports = (config) => {
  const log = config.log();
  service.get('/service/:location', (req, res) => {
    request.get('api.openweathermap.org/data/2.5/weather?q= ' + req.params.location + '&APPID' + config.openweathermap_api_appid, (err, response) => {
      if (err) {
        log.error(err);
        return res.sendStatus(404);
      }
      const temp = response.body.main.temp;
      const desc = response.body.weather[0].description;
      res.json({result: `${desc} at ${temp} degrees`});
    });
  });
  return service;
};
