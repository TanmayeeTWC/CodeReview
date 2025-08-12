import { expect } from '@playwright/test';
export class loginHelper {

  constructor(page) {
    this.page = page;
  }

  async login(email = process.env.APP_USERNAME, password = process.env.APP_PASSWORD) {
    await this.page.goto(process.env.APP_URL);
    await expect(this.page.getByPlaceholder('Email')).toBeVisible();
    await this.page.getByPlaceholder('Email').fill(email);
    await this.page.fill('input[name="password"]', password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
    await expect(this.page).toHaveTitle('Clipboard');
  }
}