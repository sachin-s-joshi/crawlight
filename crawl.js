require('dotenv').config()
const fs = require('fs')
var Crawler = require("js-crawler");
const fileName = './lighthouserc.json';
const file = require(fileName);
var listOfUrls = []
var rootUrl = process.env.URL || "https://www.google.com"

var series = require('async')
const { execSync } = require('child_process')


var crawler = new Crawler().configure(
  {
    ignoreRelative: false,
    depth: process.env.DEPTH || 2,
    shouldCrawl: function (url) {
      return url.includes(rootUrl)
    }
  }
);

crawler.crawl({
  url: rootUrl,
  success: async function (page) {
    console.log(page.url);
    //add only if page has body length >0 with 200 status
    if (page.response.body && page.response.body.length > 0 ) {
      listOfUrls.push(page.url);
      await updateJson(page.url)
      execSync("npm run lhci")
      //execSync("npm run lhci")
    }
  },
  failure: function (page) {
    console.error(`${page.url} failed with ${page.status} status , found at ${page.referer}`)
  },
  finished: function (allUrl) {
    //updateJson(listOfUrls)   // add crawled urls in lighthouserc.json file
  }
});

async function updateJson(urls) {

  file.ci.collect.url = urls;
  return new Promise((resolve,reject) => {
    fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
      if (err) reject(err);
      console.log('writing to ' + fileName);
      resolve('done')
    });
  })

}
