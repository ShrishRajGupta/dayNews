const express = require('express')
const app=express()
const port = process.env.PORT||3000;
const moment = require('moment')
app.locals.moment = moment;
const bodyParser = require('body-parser')

// DB
const connectDB = require('./config/conn.js');
connectDB();


// middleware & statics
app.use(express.static('public'))
const authenticateToken = require('./middleware/validate.js');
app.use(express.json());
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// template engine  
app.set('view engine','ejs')


app.use('/user',require('./routes/userRoutes.js'))
app.use('/',authenticateToken,require('./routes/news.js'))

app.set('views','./views')

// 404
app.use((req, res, next) => {
    res.status(404).render('404', { title: 'error page' });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
  