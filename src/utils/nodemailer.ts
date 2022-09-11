import * as nodemailer from 'nodemailer';

export async function mainNodeMailer(
  email: string,
  name: string,
  link: string,
) {
  const transport = nodemailer.createTransport({
    service: 'SendinBlue',
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.API_PASSWORD_SMTP,
    },
    port: 587,
    host: 'smtp-relay.sendinblue.com',
  });
  const mailOptions = {
    from: 'lukasxdp@gmail.com',
    to: email,
    subject: `[CONFIRM EMAIL] Important`,
    text: 'Confirm email',
    html: `<b>Hellow ${name} Confirm email open link !</b> 
    <a href="${link}" tagert="_blank">Confirmation Email</a>`,
  };

  transport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      return response;
    }
  });
}
