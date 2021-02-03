# Evaluation of Microsoft Playwright

## Introduction
**Automation testing**
Automation testing is a way to automate one's browser by simulating user actions like clicks. As Software or applications become more complex as they are built on layers and entire networks of sub-systems, including UI and API layers, external databases, networks, and even third-party integrations, there is always a need for thorough testing to be done, this ranges from unit testing to end to end testing of the application. Browser automation frameworks to perform end-to-end testing helps to ascertain the stability and the health of the application which in turn leads to the success of the application when on production. The general stability of the application doesn't entirely depend on end-to-end testing but it surely helps detects bugs, among other benefits, thus increasing application productivity. Below are some of the popular test automation frameworks;
- Selenium
- Puppeteer
- Cypress
- Playwright(maybe the new kid on the block but it's gaining quite a trajectory among Software developers and testers)

### Project Context
The Playwright evaluation is a result of a need for potential replacement of [WebdriverIO](https://webdriver.io/) with one of the best non-selenium modern automation testing framwork. Wikimedia supports a large number of repositories as well as extensions. In order to ensure good code practices across all these repositories, an extensive amount of testing is performed and one of the tests performed is an end to end test. WebdriverIO is the current browser automation framework being used for implementing the end-to-end tests. However, with the recent increase in awareness about end-to-end testing, a number of equally competitive non-selenium solutions have been introduced and one of them is [Microsoft Playwright](https://github.com/microsoft/playwright).

At the time of choosing which automation framework to use in the implementation of the automation testing, extensive research was done and an [evaluation of WebdriverIO](https://filipin.eu/selenium-javascript) was carried out by Željko Filipin, who is a Senior Engineer in Test at Wikimedia Foundations and also one of my mentors. In search for a potential replacement of WebdriverIO, a number of modern and non-selenium automation frameworks have been evaluated against WebdriverIO. These evaluations were done by Soham who was Google Summer of Code 2020 intern and one of my mentors, they can be found using the links below;
- [Cypress](https://www.sohamp.dev/blog/2020-06-29-fanboying-cypress/)- to be confirmed and changed
- [Puppeteer](https://www.sohamp.dev/blog/2020-08-24-wmf-gsoc2020/)


So, this brings us to the current framework which is [Microsoft Playwright](https://github.com/microsoft/playwright) being evaluated against WebdriverIO. The project involved;
- Configuring and Setting up of Wikimedia-core to run on CI, in this case on Github actions.
- Implementation of all Wikimedia-core tests in Playwright

### Playwright Vs WebdriverIO

[WebdriverIO](https://github.com/webdriverio/webdriverio) WebdriverIO is a test automation framework that allows you to run tests based on the Webdriver protocol and Appium automation technology. WebdriverIO is known to be;
Extendable
Adding helper functions, or more complicated sets and combinations of existing commands is simple and really useful

Compatible
WebdriverIO can be run on the WebDriver Protocol for true cross-browser testing as well as Chrome DevTools Protocol for Chromium-based automation using Puppeteer.

Feature Rich
The huge variety of community plugins allows you to easily integrate and extend your setup to fulfill your requirements.

The above points are just a few of WebdriverIO capability. To explore more WebdriverIO capability, you can check out the [WebdriverIO](https://webdriver.io/) documentation and the [Wikipedia Repo](https://github.com/wikimedia/mediawiki/tree/master/tests/selenium).

[Playwright](https://github.com/microsoft/playwright) is a Node.js library to automate Chromium, Firefox, and WebKit with a single API. Playwright is known for the following capability;

Test across all modern browsers
Single API to automate Chromium, Firefox, and WebKit.

Use in your preferred language
Use the Playwright API in JavaScript & TypeScript, Python, C# and, Java.

Automate without trade-offs
Capable automation for single-page apps that rely on the modern web platform.

The above points are just a few capabilities. To explore more on Playwright capability, you can check out the [Playwright](https://playwright.dev/) documentation and this [ forked Wikipedia Repo](https://github.com/hariclerry/mediawiki/tree/master/tests/playwright).

While working with Playwright for the past two months, it has come across as easy to install and setup. The package takes care of installing all the browsers(Chromium, Firefox, and WebKit). Capturing Screenshots is an out-of-the-box experience. However, Video recording requires separate installation of [playwright-video and ffmpeg](https://playwright.tech/blog/record-your-browser-tests-with-playwright) but they all blend in with Playwright seamlessly.

Below are some of the benefits I have experienced and seen with using playwright;

- Console debug option which is very useful in an event when tests are failing anonymously.
- Scenarios that span multiple pages, domains, and iframes
- Auto-wait for elements to be ready before executing actions (like click, fill)
- Intercept network activity for stubbing and mocking network requests
- Seamless integration with Jest.

Sample Page screenshot code

This code snippet navigates to wikipedia.org in WebKit and saves the screenshot.

    `const playwright = require('playwright');

    (async () => {
        const browser = await webkit.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://www.wikipedia.org/');
        await page.screenshot({ path: 'wikipedia-home-page.png' });
        await browser.close();
    })();`

**Playwright and Jest**
 [Jest](https://jestjs.io/) is a delightful JavaScript Testing Framework with a focus on simplicity. Playwright can be integrated into a project in two ways and one of them is by using the [jest-playwright](https://github.com/playwright-community/jest-playwright) which has rich has features like:

 - Multi-browser and device (like iPhones with given screen sizes) support
 - jest-dev-server integration which can start your webserver like create-react-app before running the tests
 - expect-playwright integration which provides common expect helper functions

 jest-playwright is added to the jest configuration as a preset which makes all the features availbale to be used at your disposal. it was inspired by [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer/blob/master/README.md#start-a-server).

 **Example of jest-playwright.config.js**

    `module.exports = {
        browsers: [process.env.BROWSER || "chromium"],
        devices: ["iPhone 6", "Pixel 2"]
    }`

Below are some of the great and useful funstions that come with jest-playwright;

Reset helper functions. This functions come in handy when you want to reset the browser or page for various resasons such as deleting cookies. It exposes functions like, `esetPage(), resetContext() and resetBrowser()`.
Example usage of reset current browser

    `beforeEach(async () => {
        await jestPlaywright.resetBrowser()
    })`

Debug helper functions. This help in debugging test incase there are test failure. It uses the `jestPlaywrightDebug()`

Example usage of Debug

    `test.jestPlaywrightDebug('failed', async ({ page }) => {
        await page.goto('https://www.wikipedia.org/')
        const title = await page.title()
        await expect(title).toBe('Nothing')
    })`

For more of these gems that come with jest-playwright, please visit the [Github Repo](https://github.com/playwright-community/jest-playwright)


**Playwright and WebdriverIO metrics**


### Why adapt Playwright

### Advantages and disadvantages of Migrating from WebdriverIO

### What Next
- Refactor the existing test
- Evaluate Playwright against Puppeteer

### Summary