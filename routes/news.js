require('dotenv').config()
const express = require('express')
const axios = require('axios')
const route = express.Router();


const apiKey = process.env.API_KEY;

// @desc = it gets all daily headlines 
route.get('/', async (req, res) => {
    try {
        const url = `http://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

        const news_get = await axios.get(url)
        console.log(news_get.data);
        res.render('news', { articles: news_get.data.articles })

    } catch (err) {
        console.log(err);
    }
});


// @desc = a post request for searching specific data
// @respose = it is sent to news.ejs 
route.post('/search', async (req, res) => {
    const search = req.body.search
    // console.log(req.body.search);

    try {
        const url = `http://newsapi.org/v2/everything?q=${search}&apiKey=${apiKey}`
        const news_get = await axios.get(url)
        // console.log(news_get.data.articles);
        res.render('news', { articles: news_get.data.articles })

    } catch (err) {
        console.log(err);
    }
});

module.exports = route