const express = require('express');
const scraperRouter = require('./scrapeRouter.js');
const puppeteer = require('puppeteer');
const app = express();

app.use(express.json());


app.use( '/',scraperRouter);
const port = 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
module.exports = app;
