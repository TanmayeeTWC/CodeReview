const { test, expect } = require('@playwright/test');
const { loginHelper } = require('../../helpers/clipboard/loginHelper.js');
const { CustomerTab } = require('../../pages/clipboard/CustomerTab.js');    
const { TeamMember } = require('../../pages/clipboard/TeamMember.js');
const { FormTemplates } = require('../../pages/clipboard/FormTemplates.js');
const { testchamber } = require('../../helpers/clipboard/addressGeneratorHelper.js');

test.describe('Login and test', () => {
  test.describe.configure({ mode: 'serial' });

  let customerPage
  let teamMemberPage
  let formTemplatesPage
  let login
  let name, phone, email
  let sharedName, sharedPhone;

  test.beforeAll(() => {
    const data = testchamber();
    sharedName = data.name;
    sharedPhone = data.phone;
  });

  test.beforeEach(async ({ page }) => {

    const data = testchamber();
    name = data.name;
    phone = data.phone;
    email = data.email;
    login = new loginHelper(page);
    customerPage = new CustomerTab(page);
    teamMemberPage = new TeamMember(page);
    formTemplatesPage = new FormTemplates(page);
    await login.login();

  })

  test('Create Customer Test', async ({ page }) => {
    await customerPage.createCustomer(sharedName, sharedPhone);
  });

  test('Add Customer Details Test', async ({ page }) => {
    await customerPage.addCustDetails(sharedName);
    await expect(page.getByText(sharedName)).toBeVisible();
    await expect(page.getByText(sharedName)).toHaveCount(1);
  });

  test('Add team member', async ({ page }) => {
    await teamMemberPage.createTeamMember(name, name, email, phone, 'Testtest1');
    await expect(page.getByRole('heading', { name: name })).toBeVisible()
  });

  test('Create formula', async ({ page }) => {
    await formTemplatesPage.addFormula(sharedName, 'qty', 'count');
  });

  test('Create Form Template', async ({ page }) => {
    await formTemplatesPage.createEquipmentTemplate(name, sharedName);
  });
});