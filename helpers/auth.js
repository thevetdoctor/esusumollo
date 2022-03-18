/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { config } = require('dotenv');
const jwt = require('jsonwebtoken');
const { Address6 } = require('ip-address');
const { response } = require('oba-http-response');

config();

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  console.log(req.socket.remoteAddress, req.ip, req.socket.localAddress);
  const address = new Address6(req.socket.remoteAddress);
  console.log(address.inspectTeredo().client4);

  const { authorization } = req.headers;

  if (typeof authorization !== 'undefined') {
    const [, token] = authorization.split(' ')[1];
    req.token = token;

    jwt.verify(req.token, JWT_SECRET, (error, auth) => {
      if (error) {
        return response(res, 403, null, 'Auth Failed');
      }
      if (auth) {
        req.body.userId = auth.user.id;
      }
      next();
    });
  } else {
    return response(res, 403, null, 'Access forbidden');
  }
};
