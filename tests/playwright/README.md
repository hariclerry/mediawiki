# PLAYWRIGHT TESTS

## Browsers
By default Playwright runs in chromium browser. To run the tests in Firefox or Webkit browsers, set the environment variable to the browser of your choice;

    DISPLAY=firefox 
Or;
    DISPLAY=webkit
## Usage
There are three supported modes of running the tests.
#### Headless
The Playwright tests default to headless mode, unless a `HEADLESS` environment variable is set to false.To run headless;

    ```npm run playwright:silent```
#### Visible browser
To see the browser window;

    ```npm run playwright:open```
#### Video recording
