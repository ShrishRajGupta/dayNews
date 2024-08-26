const express = require('express')
const app=express()
const port = process.env.PORT||3000;
const moment = require('moment')
app.locals.moment = moment;
const bodyParser = require('body-parser')
const cookieParser=require('cookie-parser');
const router = express.Router();

// DB
const connectDB = require('./config/conn.js');
connectDB();


// middleware & statics
app.use(express.static('public'))
app.use(express.json());
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());

// template engine  
app.set('view engine','ejs')
app.set('views','./views')


router.use('/',require('./routes/news.js'))
router.use('/user',require('./routes/userRoutes.js'))
app.use('/api',router)

// 404
app.use((req, res, next) => {
    res.status(404).render('404', { title: 'error page' });
})

module.exports = app;
