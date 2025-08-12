import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'fs';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  reportSlowTests: null,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1, // process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['junit',  {
        // Whether to add <properties> with all annotations; default is false
        embedAnnotationsAsProperties: true,
        // Where to put the report.
        outputFile: './test-results/junit-report.xml'
    }
    ]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.APP_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',

    
    storageState: existsSync('playwright/.auth/user.json') ? 'playwright/.auth/user.json' : undefined

  },

  timeout: 60_000, //test timeout

  /* Configure projects for major browsers */
  projects: [
     {
       name: 'GoogleChrome',
       use: { 
        ...devices['Desktop Chrome'], 
        channel: 'chrome',
        headless: false, // Set to true for headless mode
        //storageState: existsSync('playwright/.auth/user.json') ? 'playwright/.auth/user.json' : undefined,
        //trace: 'retain-on-failure' 
      },
     },
  ],

});
