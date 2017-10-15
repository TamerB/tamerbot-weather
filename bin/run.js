'use strict';

const config = require('../config');
const log = config.log();
const request = require('superagent');
const service = require('../server/service')(config);
const http = require('http');
const server = http.createServer(service);

server.listen();

server.on('listening', function () {
  log.info(`Slack-Bot-Time is listening on ${server.address().port} in ${service.get('env')} mode.`);

  const announce = () => {
    request.put(`http://localhost:3000/service/weather/${server.address().port}`, (err, res) => {
      if (err) {
        log.error(err);
        log.error('Error connecting to tamerbot');
        return;
      }

      log.info(res.body);
    });
  };

  announce();
  setInterval(announce, 15*1000);
});
