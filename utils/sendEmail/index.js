var nodemailer = require('nodemailer');
require('dotenv').config();

async function sendEmail(email, subject, html) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'eduhub.ptit@gmail.com',
          pass: process.env.APP_EMAIL_PASS
        }
      });
      
      var mailOptions = {
        from: 'eduhub.ptit@gmail.com',
        to: email,
        subject: subject || '',
        html: html
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = {
    sendEmail
}