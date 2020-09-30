const express = require('express')
const app = express()
const port = process.env.PORT || 3010
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(cors())


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


let smtp_login = process.env.SMTP_LOGIN || '';
let smtp_password = process.env.SMTP_PASSWORD || '';


let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: false,
  port: 587,
  requireTLS: true,
  auth: {
    user: smtp_login, // generated ethereal user
    pass: smtp_password // generated ethereal password
  },
});

app.post('/sendMessage', async (req, res) => {


let {firstName, lastName, email, phone} = req.body

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'My Profile page', // sender address
    to: "testdenis12345@gmail.com", // list of receivers
    subject: "test", // Subject line
    //text: "test hyundai", // plain text body
    html: `<b>Сообщение с вашего сайта</b> <div>Fist Name: ${firstName}</div> <div>Last Name: ${lastName}</div> <div>Email: ${email}</div> <div>Phone number: ${phone}</div>`, // html body
  });

  res.send('ok')
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})