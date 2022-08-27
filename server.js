/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const { Address6 } = require('ip-address');
const CORS = require('cors');
require('dotenv').config();
// const db = require('./models/index');
// const redis = require('redis');

// const subscriber = redis.createClient({
//   url: 'redis://:p20ca83c7c11773fba509b0f2757c51ba516ac591b17ffbc0713eaa1eca229c07@ec2-3-232-215-103.compute-1.amazonaws.com:21080',
// });
// const publisher = redis.createClient({
//   url: 'redis://:p20ca83c7c11773fba509b0f2757c51ba516ac591b17ffbc0713eaa1eca229c07@ec2-3-232-215-103.compute-1.amazonaws.com:21080',
// });
// eslint-disable-next-line import/extensions
require('./helpers/kafka.js');
const routeHandler = require('./routes/index');

const app = express();
const port = process.env.PORT || 5000;

app.use(CORS());
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

async function noderedis() {
  await client.connect();

  await subscriber.subscribe('dogs', (message) => {
    console.log(channel, message);
  });

  publisher.publish('dogs', 'Roger');
}

routeHandler(app);

app.get('/', (req, res) => {
  console.log(req.socket.remoteAddress, req.ip, req.socket.localAddress);
  const address = new Address6(req.socket.remoteAddress);
  console.log(address.inspectTeredo().client4);

  res.status(200).json({
    message: 'Welcome to Esusu',
    ipaddress: address.inspectTeredo().client4,
  });
});

// Handle unhandledRejection error
process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection', error);
});

// Handles all errors
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(err.status || 400).send({ success: false });
  }
  if (err) console.log(`Error: ${err.message}`);
  return res
    .status(err.status || 400)
    .send({ success: false, message: err.message });
});

app.listen(port, () => {
  console.log('Server running @ port: ', port);
});
