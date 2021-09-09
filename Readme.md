
# Introduction

Lighthouse tools has been used widely in comapnies to track client side web page performance metrics viz; 
- SEO
- Accessibility
- Performance
- Best Practices 

We at BHN have been aiming at standardizing the lighthouse tool for tracking performance metrics of crtical sites for every build releases so that we get notified if there are any unforseen issues to track down and resolve.

And with this repository, we aim to create our in-house tool using lighthouse-ci so that we can use this opportunity to integrate it with build processes or trigger manually after every release cycles to get the consolidated report for each of the websites we are looking to track. 

We are making use of js-crawler to crawl the website that lists the URLs to be sent for lighthouse, and then Lighthouse runs the checks for each of these urls before giving us consolidated report

# Setup

### Pre-requisite
 - Installed NodeJs (v14 or greater)
 - A chrome browser installed in local machine
 - Any code editor of your choice to run JS files

### Steps to Run the code

- Naviagte to root folder
- Set environment variable values in `.env` file (URL, DEPTH) - This is for crawler
- Install the dependencies via `npm install` (This is usually one time activity or whenever there is update to package.json)
- Now run `npm test` - This will first crawl the site and then start running lighthouse for each urls found

### Sample Config
```
{
  "ci": {
    "collect": {
      "numberOfRuns": 1,
      "disableStorageReset": false,
      "settings": {
        "disableStorageReset": false,
        "maxWaitForLoad": 60000,
        "throttlingMethod": "devtools"
      },
      "url": [
        "https://topsmarkets.preprodhawkcommerce.com/"
      ]
    },
    "upload": {
      "target": "filesystem",
      "outputDir": "./lhci_reports",
      "reportFilenamePattern": "%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%"
    },
    "assert": {
      "assertions": {
        "categories:performance": [
          "error",
          {
            "minScore": 1
          }
        ]
      }
    }
  }
}
```

- You can refer details for each of the attributes - [LigthouseCI](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md#server)


## Future Enhancements

 - Consolidate single report easy-to-read HTML report for all pages -> **In Analysis**
 - Setting up CI server - **TBD**
 - Jenkins pipeline integration - **TBD**
 - Setting up custom script for getting metrics on pages like Login/checkout as these are not crawlable links -> **In Progress**


Please feel free to reach out to me in case of any queries - sachin.joshi@bhnetwork.com