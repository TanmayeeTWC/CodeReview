import { expect } from '@playwright/test';

export class TeamMember {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.teamMemberTab = page.getByRole('link', { name: 'Team' });
    this.createTeamMemberButton = page.getByRole('link', { name: ' Add Team Member' });
    this.firstName = page.getByPlaceholder("First Name")
    this.lastName = page.getByPlaceholder("Last Name");
    this.emailAddress = page.getByPlaceholder("Email Address");
    this.phoneNumber = page.getByPlaceholder("Phone Number");
    this.password = page.getByRole('textbox', { name: 'Password' })
    this.confirmPassword = page.locator("//input[@id='passconf']")//page.getByRole('textbox', { name: 'Confirm Password' });
    this.role = page.locator("//a[text()='Admin ']")
    this.createBtn = page.getByRole('button', { name: 'Create User' });

  }
  async createTeamMember(firstName, lastName, email, phone, password) {
    await this.teamMemberTab.click();
    await this.createTeamMemberButton.click();
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.emailAddress.fill(email);
    await this.phoneNumber.fill(phone);
    await this.password.fill(password);
    await this.confirmPassword.fill(password);
    await this.role.click();
    await this.createBtn.click();
  }
}