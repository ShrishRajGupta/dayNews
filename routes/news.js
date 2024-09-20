require('dotenv').config()
const express = require('express')
const axios = require('axios')
const route = express.Router();
const authenticateToken = require('../middleware/validate.js');

const apiKey = process.env.API_KEY;

// @desc = it gets all daily headlines 
route.get('/', async (req, res) => {
    try {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;
        const news_get = await axios.get(url)
        if (req.cookies.authorization === undefined || req.cookies.authorization === null){
            res.locals.value= "login";
            // next();
            res.render('news', { articles: news_get.data.articles})
        }
        else{
            res.locals.value= "logout";
            // next();
            res.render('news', { articles: news_get.data.articles})
        }
    } catch (err) {
        console.log(err); // render 500
        res.status(500).render('500');
    }
});


// @desc = a post request for searching specific data
// @respose = it is sent to news.ejs 
route.post('/search', authenticateToken, async (req, res) => {
    const search = req.body.search;
    try {
        const url = `http://newsapi.org/v2/everything?q=${search}&apiKey=${apiKey}`
        const news_get = await axios.get(url)
        res.render('news', { articles: news_get.data.articles, value: "logout" })

    } catch (error) {
        if (error.response) {
            console.log(error) // render 500
        res.status(500).render('500');            
        }
    }
});
//@desc = a get request to access different categories
//response = it is sent to news.ejs
route.get('/news/:category', authenticateToken, async (req, res) => {
    var category = req.params.category;
    try {
        var url = 'http://newsapi.org/v2/top-headlines?country=in&category=' + category + '&apiKey=' + apiKey;

        const news_get = await axios.get(url)
        res.render('news', { articles: news_get.data.articles, value: "logout" })

    } catch (error) {
        if (error.response) {
            console.log(error) // render 500
        res.status(500).render('500');
        }

    }
})

module.exports = route