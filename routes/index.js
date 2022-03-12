const AuthRoutes = require('./AuthRoutes');
const GroupRoutes = require('./GroupRoutes');
const MemberRoutes = require('./MemberRoutes');
const TenureRoutes = require('./TenureRoutes');
const ContributionRoutes = require('./ContributionRoutes');
const PayoutRoutes = require('./PayoutRoutes');
const express = require('express');
const router = express.Router();
require('dotenv').config();
const { response } = require('oba-http-response');

const sgMail = require('@sendgrid/mail');
const sendmail = {
    send: async(req, res) => {
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'thevetdoctor@gmail.com',
  from: 'thevetdoctor@gmail.com',
  subject: 'Hello from EsusuMollo!',
//   text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>Welcome to a vibrant community1</strong>',
};
//ES6
try {
    sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error.message);

    if (error.response) {
    //   console.error(error.response.body)
      response(res, error.statusCode, null, e.message, 'Error in sending mail');
    }
});
return response(res, 200, {}, null, 'Mail sent')
} catch(e) {
    response(res, 500, null, e.message, 'Server error');
}
 }
};

module.exports = (app) => {
    app.use('/auth', AuthRoutes);
    app.use('/groups', GroupRoutes);
    app.use('/members', MemberRoutes);
    app.use('/tenures', TenureRoutes);
    app.use('/contributions', ContributionRoutes);
    app.use('/payouts', PayoutRoutes);
    app.use('/sendMail', sendmail.send);
}