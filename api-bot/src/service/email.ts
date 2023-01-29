import nodemailer from 'nodemailer'

interface sendMail {
  to: string;
  code: string;
  subject: string
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendEmail = ({to, code, subject}: sendMail) => {
  return new Promise((resolve, reject) => {
    const mailDetails = {
      from: 'Car service <is3.andrei.2@gmail.com>',
      to,
      subject,
      html: `
          <div> 
          <h1>Код для активації бота ${code}</h1>
          </div>
            `
    }
    transporter.sendMail(mailDetails,
      function (err, info) {
        if (err) {
          console.log('Помилка')
          return reject(err)
        } else {
          return resolve(info)
        }
      })
  })
}