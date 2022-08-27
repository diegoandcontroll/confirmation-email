import * as nodemailer from 'nodemailer';

export async function mainNodeMailer(email: string, link: string) {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.API_KEY,
    },
    port: 456,
    host: 'smtp.gmail.com',
  });
  const mailOptions = {
    from: 'fake@vintomaper.com',
    to: email,
    subject: `Sending email with nodemailer and GmailSTMP`,
    text: 'Hellow World',
    html: `<b>Hello world?</b> <a href="${link}" tagert="__blank">Confirmation Email</a>`,
  };

  transport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      return response;
    }
  });
}
