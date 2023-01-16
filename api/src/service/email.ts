import nodemailer from 'nodemailer'

interface sendMail {
  to: string;
  link: string;
  subject: string
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'is3.andrei.2@gmail.com',
    pass: 'ohmdmppsqlvbpbfc'
  }
});

export const sendEmail = ({to, link, subject}: sendMail) => {
  return new Promise((resolve, reject) => {
    const mailDetails = {
      from: 'Car service <is3.andrei.2@gmail.com>',
      to,
      subject,
      html: `
             <div> 
          <h1>Для активації перейдіть по посиланню</h1>
          <a href="${link}">Перейти.</a>
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