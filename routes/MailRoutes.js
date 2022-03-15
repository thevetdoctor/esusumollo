/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const sgMail = require('@sendgrid/mail');
const { response } = require('oba-http-response');
const missingInput = require('../helpers/missingInput');

const sendmail = {
  send: async (req, res) => {
    const {
      from, to, subject, message,
    } = req.body;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      from,
      to,
      subject,
      text: message,
      html: `<strong>${message}</strong>`,
    };
    // ES6
    try {
      const required = ['from', 'to', 'subject', 'message'];
      missingInput(required, req.body);

      sgMail
        .send(msg)
        .then(() => { console.log('success here'); }, (error) => {
          console.error('error', error.message);

          if (error.response) {
            return response(res, error.statusCode, null, error.message, 'Error in sending mail');
          }
        });
      return response(res, 200, {}, null, 'Mail sent');
    } catch (e) {
      response(res, 500, null, e.message, 'Server error');
    }
  },
};

router.post('/sendmail', sendmail.send);

module.exports = router;
