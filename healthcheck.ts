// healthcheck.js
/* eslint-env node */
/* global process */

import * as http from 'http';

const options = {
  host: 'localhost',
  port: process.env.PORT || 3000,
  path: '/api',
  timeout: 2000,
};

const request = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', function (err) {
  console.log('ERROR:', err.message);
  process.exit(1);
});

request.on('timeout', function () {
  console.log('TIMEOUT');
  request.destroy();
  process.exit(1);
});

request.end();