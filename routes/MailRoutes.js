/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const { Router } = require('express');

const router = Router();
const sgMail = require('@sendgrid/mail');
const { response } = require('oba-http-response');
const missingInput = require('../helpers/missingInput');
const transport = require('../helpers/mail');

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
    try {
      const required = ['from', 'to', 'subject', 'message'];
      missingInput(required, req.body);

      await transport.sendMail(msg, (err, info) => {
        if (err) {
          console.error('Sending mail failed');
          console.error(err);
        } else {
          // console.info(info);
          console.info('Mail Sent Successfully');
        }
      });

      sgMail
        .send(msg)
        .then(() => {}, (error) => {
          console.error('error', error.message);

          if (error.response) {
            return response(res, error.statusCode, null, error.message, 'Error in sending mail');
          }
        });
      return response(res, 200, {}, null, `Mail sent to ${to}`);
    } catch (e) {
      response(res, 500, null, e.message, 'Server error');
    }
  },
};

router.post('/sendmail', sendmail.send);

module.exports = router;
