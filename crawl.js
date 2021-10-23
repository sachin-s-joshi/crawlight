require('dotenv').config()
const fs = require('fs')
var Crawler = require("js-crawler");
const fileName = './lighthouserc.json';
const file = require(fileName);
var listOfUrls = []
var rootUrl = process.env.URL || "https://www.google.com"



var crawler = new Crawler().configure({
    ignoreRelative: false,
    depth: process.env.DEPTH || 2,
    shouldCrawl: function(url) {
        return url.includes(rootUrl)
    }
});

crawler.crawl({
    url: rootUrl,
    success: function(page) {
        console.log(page.url)
        if (!page.url.includes('.xml')) {
            listOfUrls.push(page.url);
        }
    },
    failure: function(page) {
        console.error(page.url, page.status, page.referer)
    },
    finished: function(allUrl) {
        updateJson(allUrl) // add crawled urls in lighthouserc.json file
    }
});

function updateJson(urls) {
    file.ci.collect.url = urls;
    fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
        console.log('writing to ' + fileName);
    });

}