const nodemailer = require('nodemailer');

const { SMTP_DOMAIN, SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD } = process.env;
// console.log(SMTP_DOMAIN, SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD);

const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  service: "gmail",
  secure: true,
  // secureConnection: false,
  requiresAuth: true,
  // domain: SMTP_DOMAIN,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
});

transport.verify((error) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log("Server is ready to take our messages");
  }
});

module.exports = transport;
