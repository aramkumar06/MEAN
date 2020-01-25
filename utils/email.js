const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // create a transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'ea703a8aecce55',
      pass: 'f1618fe26a9963'
    }
  });
  // define the email options
  const mailOptions = {
    from: 'Company <travel@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  // actyally send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
