require('dotenv').config()
console.log(process.env.SESSION_SECRET);
const express = require('express')
const app = express()
const port = 3000
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

app.use(cookieParser(process.env.SESSION_SECRET))
app.use(express.static('public'))

const requireAuthController = require('./middlewares/auth.middleware')


app.set('views', './views'); // Thư mục views nằm cùng cấp với file app.js
app.set('view engine', 'pug'); 
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/users', requireAuthController.requireAuth, userRoute);
app.use('/auth', authRoute);


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


/*

if errors
        .alert.alert-danger
    form(method="POST")
    .form-group
        label(for='email') Email address
        input#exampleInputEmail1.form-control(type='email', aria-describedby='emailHelp', name="email")
    .form-group
        label(for='password') Password
        input#exampleInputPassword1.form-control(type='password', name="password")
    button#submit.btn.btn-success(type='submit', value=' Send') Login
*/