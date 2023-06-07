const express = require('express')
const app=express()
const port = process.env.PORT||3000;
const moment = require('moment')
app.locals.moment = moment;

// template engine  
app.set('view engine','ejs')

// middleware & statics
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.use('/',require('./routes/news.js'))

app.set('views','./views')

// 404
app.use((req, res, next) => {
    res.status(404).render('404', { title: 'error page' });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
  