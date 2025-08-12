const { test, expect } = require('@playwright/test');
const LoginHelper = require('../../helpers/clipboard/loginHelper.js');

test('Login Test', async ({ page }) => {
  await login(page, 'tanmayee.ghanta@troyweb.com', 'Testtest1');
  await expect(page).toHaveTitle("Clipboard");
});