const express = require('express')
const app = express()
const port = 3000
const userRoute = require('./routes/user')

app.set('views', './views'); // Thư mục views nằm cùng cấp với file app.js
app.set('view engine', 'pug'); 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/users', userRoute);



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))