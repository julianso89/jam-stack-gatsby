const nodemailer = require('nodemailer')

const clientID =
  '198150865754-f01af8ahev4cq80c062a73kd6u724e8f.apps.googleusercontent.com'

const refreshToken =
  '1/Y9TOJ4kEpTdNQYyqorlVuWuKWqfc0ZD1LurHTpUwvN4BO0GxkDN61FfgdLdT3sJg'

exports.handler = function(event, context, callback) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'julianso89@gmail.com',
      clientId: clientID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: refreshToken,
    },
  })

  const body = JSON.parse(event.body)

  const mailOptions = {
    to: 'julianso89@gmail.com',
    subject: `New Website Message From ${body.name}`,
    text: `Sender Name: ${body.name}, Sender Email: ${
      body.email
    }, Sender Message: ${body.message}`,
  }
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error)
      callback(null, {
        statusCode: 500,
        body: JSON.stringify(error),
      })
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(info.response),
      })
    }
  })
}
