# Evaluation of Microsoft Playwright

## Introduction

Test automation is a way to automate one's browser by simulating user actions like clicks. Applications become more complex as they are built on layers and entire networks of sub-systems, including UI and API layers, external databases, networks, and even third-party integrations, there is always a need for thorough testing to be done, this ranges from unit testing to end to end testing of the application. Test automation is one of the ways to ascertain the stability and the health of applications which can lead to the success of the application when on production. The general stability of the application doesn't entirely depend on end-to-end testing but it surely helps to detect bugs in applications, among other benefits. Below are some of the popular test automation frameworks;

-   Selenium
-   Puppeteer
-   Cypress
-   Playwright

Playwright maybe the new kid on the block but it's gaining quite a trajectory among Software developers and testers.

### Project Context

The Playwright evaluation is a result of a need for to check if [WebdriverIO](https://webdriver.io/) is still a good test automation framework compared to some of the best non-selenium modern test automation framwork. Wikimedia supports a large number of repositories. So, in order to ensure good code practices across all these repositories, an extensive amount of testing is performed and one of the tests performed is an end to end test. WebdriverIO is the current browser automation framework being used for implementing the end-to-end tests. However, with the recent increase in awareness about end-to-end testing, a number of equally competitive non-selenium solutions have been introduced and one of them is [Playwright](https://github.com/microsoft/playwright).

At the time of choosing which automation framework to use in the implementation of the test automation, extensive research was done and an [evaluation of WebdriverIO](https://filipin.eu/selenium-javascript) was carried out by Željko Filipin, who is a Senior Engineer in Test at Wikimedia Foundation and also one of my mentors. To verify if WebdriverIO is still a great testing framework for mediawiki apps, a number of modern and non-selenium automation frameworks have been evaluated against WebdriverIO. These evaluations were done by Soham Parekh who was Google Summer of Code 2020 intern and is also one of my mentors and [Sim T.H Tran](https://www.mediawiki.org/wiki/User:SimTran). These evaluations can be found in the links below;

-   [Cypress Evaluation](https://www.mediawiki.org/wiki/User:SimTran/Cypress_vs_WebdriverIO:_What_are_the_differences%3F)
-   [Puppeteer Evaluation](https://www.sohamp.dev/blog/2020-08-24-wmf-gsoc2020/)

So, this brings us to the current framework being evaluated against WebdriverIO, which is [Playwright](https://github.com/microsoft/playwright). The evaluations progress involved the following steps;

-   Configuring and Setting up of Wikimedia-core to run on CI, in this case on Github actions.
-   Implementation of all mediawiki-core tests in Playwright
-   Runing mediawiki-core tests in WebdriverIO
-   Analysis of both WebdriverIO and Playwright tests in terms of speed and stability

### Playwright Vs WebdriverIO

[WebdriverIO](https://github.com/webdriverio/webdriverio) is a test automation framework that allows you to run tests based on the Webdriver protocol and Appium automation technology. WebdriverIO is known to be;
Extendable
Adding helper functions, or more complicated sets and combinations of existing commands is simple and really useful

Compatible
WebdriverIO can be run on the WebDriver Protocol for true cross-browser testing as well as Chrome DevTools Protocol for Chromium-based automation using Puppeteer.

Feature Rich
The huge variety of community plugins allows you to easily integrate and extend your setup to fulfill your requirements.

The above points are just a few of WebdriverIO capability. To explore more WebdriverIO capabilities, you can check out the [WebdriverIO](https://webdriver.io/) documentation and the [Wikipedia Repo](https://www.mediawiki.org/wiki/Selenium).

[Playwright](https://github.com/microsoft/playwright) is a Node.js library to automate Chromium, Firefox, and WebKit with a single API. Playwright is known for the following capability;

Test across all modern browsers
Single API to automate Chromium, Firefox, and WebKit.

Use in your preferred language
Use the Playwright API in JavaScript & TypeScript, Python, C# and, Java.

Automate without trade-offs
Capable automation for single-page apps that rely on the modern web platform.

The above points are just a few capabilities. To explore more on Playwright capability, you can check out the [Playwright](https://playwright.dev/) documentation and this [ forked Wikipedia Repo](https://github.com/hariclerry/mediawiki/tree/master/tests/playwright).

While working with Playwright for the past two months, it has come across as easy to install and setup. The package takes care of installing all the browsers(Chromium, Firefox, and WebKit). Capturing Screenshots is an out-of-the-box experience. However, Video recording requires separate installation of [playwright-video and ffmpeg](https://playwright.tech/blog/record-your-browser-tests-with-playwright) but they all blend in with Playwright seamlessly.

Below are some of the benefits I have experienced and seen while using Playwright;

-   Console debug option which is very useful in an event when tests are failing with no clear error messages.
-   Scenarios that span multiple pages, domains, and iframes
-   Auto-wait for elements to be ready before executing actions (like click, fill)
-   Intercept network activity for stubbing and mocking network requests
-   Seamless integration with Jest.

**Sample Page screenshot code**

This code snippet navigates to wikipedia.org in WebKit and saves the screenshot.

```
    const playwright = require('playwright');

    (async () => {
        const browser = await webkit.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://www.wikipedia.org/');
        await page.screenshot({ path: 'wikipedia-home-page.png' });
        await browser.close();
    })();
```

**Playwright and Jest**

[Jest](https://jestjs.io/) is a delightful JavaScript Testing Framework with a focus on simplicity. Playwright can be integrated into a project in two ways and one of them is by using the [jest-playwright](https://github.com/playwright-community/jest-playwright) which has rich features like:

-   Multi-browser and device (like iPhones with given screen sizes) support
-   jest-dev-server integration which can start your webserver like create-react-app before running the tests
-   expect-playwright integration which provides common expect helper functions

jest-playwright is added to the jest configuration as a preset which makes all the features availbale to be used at your disposal. It was inspired by [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer/blob/master/README.md#start-a-server).

**Example of jest-playwright.config.js**

```js
module.exports = {
	browsers: [process.env.BROWSER || "chromium"],
	devices: ["iPhone 6", "Pixel 2"],
};
```

Below are some great and useful functions that come with jest-playwright;

Reset helper functions. These functions come in handy when you want to reset the browser or page for various resasons such as deleting cookies. It exposes functions like, `resetPage(), resetContext() and resetBrowser()`.
Example usage of reset current browser

```js
beforeEach(async () => {
	await jestPlaywright.resetBrowser();
});
```

Debug helper functions. This help in debugging test incase there are test failure. It uses the `jestPlaywrightDebug()`

Example usage of Debug

```js
test.jestPlaywrightDebug("failed", async ({ page }) => {
	await page.goto("https://www.wikipedia.org/");
	const title = await page.title();
	await expect(title).toBe("Nothing");
});
```

For more of these gems that come with jest-playwright, please visit the [Github Repo](https://github.com/playwright-community/jest-playwright)

#### Playwright and WebdriverIO metrics

##### Statistics on WebdriverIO and Playwright Popularity

![Screenshot](statistics.png)

The above data was adopted from [npm trends](https://www.npmtrends.com/cypress-vs-playwright-vs-puppeteer-vs-selenium-vs-testcafe) showing some of the most popular automation test tools. From the above charts, we see that WebdriverIO still trumps Playwright when it comes to popularity among the testing community.

##### WebdriverIO and Playwright Mediawiki-core Tests Analysis

![Screenshot](evaluation-chart.png)

The above visualized chart represents data that was collected by running mediawiki/core tests in WebdriverIO and Playwright. A total of 10 tests were run using both frameworks on [Github Actions](https://docs.github.com/en/actions) platform.

The tests were run 40 times in both frameworks to ascertain stability and reliability. No flakiness and failures were encountered during the tests run. As shown above, there is consistency in time when the tests were run in WebdriverIO and Playwright.

The above chart further shows that Playwright is much faster than WebdriverIO in terms of speed.

### Why adapt Playwright

Playwright offers some great reasons such as;

-   It's simple to set up
-   Stable features.
-   Ability to install Chrome, Firefox or WebKit (Safari) automatically
-   Bidirectional (events) – automating things like console logs is easy
-   Maintained by [Microsoft people](https://blog.logrocket.com/playwright-vs-puppeteer/) with experience maintaining Puppeteer

However, Playwright also presents some cons such as;

-   It is very new so the APIs are evolving
-   Has no support for IE11 or non-browser platforms
-   Documentations and community are not as good as the other framework yet.

### Advantages and disadvantages of Migrating from WebdriverIO

From the various evaluations done against WebdriverIO, there seems to be great potential replacement in the future and Puppeteer and Playwright seem to stand out in terms of both speed, Stability. However, the question being asked is, is it worth migrating from WebdriverIO to another test automation framework? Let’s look at the Advantages and disadvantages of a potential migration;

#### Advantages

-   WebdriverIO is [JavaScript](https://en.wikipedia.org/wiki/JavaScript) based and is built over [Node.js](https://en.wikipedia.org/wiki/Node.js) just like Puppeteer and Playwright thus it will be easier for developers since there would be no differences in programming language.

#### Disadvantages

-   Investment in WebdriverIO tool. Most tests are already written in WebdriverIO. About 30 MediaWiki repositories use it, so migrating from it to another tool would require a great deal of time and manpower.
-   Update of documentation. Most documentation is already written and has references to WebdriverIO. Updating the documentation would require some time.

### What Next

-   Refactor the existing test
-   Evaluate Playwright against Puppeteer

### Summary

Statistics show that Playwright is a better alternative tool over WebdriverIO in terms of speed. However, WebdriverIO seems to be a great tool given that it keeps evolving, new and modern features are being added to it and the community is still vibrant and supportive. As of the time of the evaluation, there are no plans to switch to a different test automation framework but this could change in the future.

### Acknowledgement

The completion of this project wouldn't have been a success without the support of my mentors, Željko Filipin, Vidhi Mody and Soham Parekh. I do appreciate the constant guidance, meetings, advice, code reviews, challenging, pair programmings, to mention but a few, that were offered during the project execution.

### References:

-   [puppeteer-selenium-playwright-cypress-how-to-choose](https://www.testim.io/blog/puppeteer-selenium-playwright-cypress-how-to-choose/)
-   [using-jest-with-playwright](https://playwright.tech/blog/using-jest-with-playwright)
-   [stateofjs](https://2020.stateofjs.com/en-US/technologies/testing/#testing_experience_ranking)
-   [playwright-community](https://github.com/playwright-community/)
