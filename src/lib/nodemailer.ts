import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ceoyuri23@gmail.com',
    pass: 'cume iuee ojjg qjls',
  },
})

// import { Email } from './email';
// import { render } from '@react-email/render';
// const emailHtml = render(<Email url="https://example.com" />);

// const options = {
//   from: 'you@example.com',
//   to: 'user@gmail.com',
//   subject: 'hello world',
//   html: emailHtml,
// };

// await transporter.sendMail(options);
