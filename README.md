## overview
OCC Plugging automated tests

## getting started
The following commands should be one-time setup to get all necessary stuff in place to where tests can be run 

### Install playwright
run these 2 commands from anywhere to globally install playwright

`npm install -g -D @playwright/test@latest`

`npx playwright install --with-deps`

to verify the install, run the version command, which should give you a version

`npx playwright --version`

### Clone the repo
clone the repository to somewhere

`git clone https://github.com/Troy-Web-Consulting/playwright-playground`

### Run npm install
from within the root directory of the cloned repo, run this command

`npm install`

### Create .env file
make a copy of `.env.example` and rename this copied file to be `.env`. adjust values as necessary

- APP_URL: string, base url of target env. doesnt end in /
- ENV_ATTACHMENTS: string, if "false", skips attachment tests. 

## running tests
first, you will likely need to authenticate

`npm run auth`

it is suggested that you run the functional tests in chromium, and the VRT in all browsers

`npm test` 

`npm run test-vrt` 

however, this generates 2 reports. a happy medium is to run all tests in chromium

`npm run test-all-chromium`

if you're brave, you can run all the tests at once in all browsers. to reduce collisions, you may want to consider changing the `workers` property in `playwright.config` to be 1

also note that the VRT tests are designed to run headless - when running headed, they will generate slighly different screenshots and result in test failures

### authenticate 
should only need to do this once until your session expires

`npm run auth`

### run ui tests in headless chromium
`npm test`

### run ui tests in headed chromium
`npm run test-headed`

### run VRT in all browsers
note: this config can support multiple workers relatively safely

`npm run test-vrt` 

### run all tests in headless chromium
`npm run test-all-chromium`

### run all tests in all browsers
`npm run test-all`

### update VRT snapshots
`npm run update-vrt` 

## notes

### chai must be v4 until node22
 - see https://github.com/chaijs/chai/issues/1561

## housekeeping commands

### Update playwright with new browsers

`npm update @playwright/test`

`npm install @playwright/test --save-dev`

`npx playwright install --with-deps`



