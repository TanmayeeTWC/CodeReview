import { expect } from '@playwright/test';
import { testchamber } from '../../helpers/clipboard/addressGeneratorHelper.js';
import { time } from 'console';

export class CustomerTab {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.customerTab = page.getByRole('link', { name: 'Customers' });
    this.createCustomerButton = page.getByRole('button', { name: 'Customer' });
    this.custNameInp = page.getByRole('textbox', { name: 'Name' });
    this.custPhoneInp = page.getByRole('textbox', { name: 'Phone' });
    this.createBtn = page.getByRole('button', { name: 'Create' });
    this.status = page.locator("//select[@name = 'status_id']"); // Status of the customer, can be 'Active' or 'Inactive'
    this.addressLine1 = page.locator("//p[contains(@class,'address')]")
    this.addressLine1Inp = page.getByPlaceholder("address line 1")
    this.cityInp = page.getByRole('textbox', { name: 'city' });
    this.stateInp = page.getByRole('textbox', { name: 'state' });
    this.zipCodeInp = page.getByRole('textbox', { name: 'zip code' });
    this.contactName = page.getByRole('textbox', { name: 'contact name' }); //locator('//form[@name="editCustomerContactForm"]/span[2]')
    this.contactNameInp = page.getByRole('textbox', { name: 'contact name' })//getByPlaceholder('contact name')
    this.contactPos = page.locator("//select[@name='position_id']")//page.getByRole('combobox', { name: 'position' });
    this.contactPhoneInp = page.getByRole('textbox', { name: 'contact phone' })//page.getByPlaceholder('contact phone')
    this.contactEmailInp = page.getByRole('textbox', { name: 'contact email' })//page.getByPlaceholder('contact email')
    this.okayBtn = page.locator(".address-container button[type='submit']")//div[@class="address-container"]//button[@type='submit']")//page.getByRole('button', { name: '' }); // Tick button for address
    this.contactOKBtn = page.locator(".contacts-list button[type='submit']"); // Tick button for contact
    this.searchBox = page.getByPlaceholder('Search')
    this.custNameHeading = page.locator("//h1[@e-name='name']")

  }

  async createCustomer(name, phone) {
    await this.customerTab.click();
    await this.createCustomerButton.click();
    await this.custNameInp.fill(name)
    await this.custPhoneInp.fill(phone)
    await this.createBtn.click()
    let cName = await this.custNameInp.innerText();
    if (name === cName) {
      console.log("Customer created successfully with name: ", cName);
    }

  }

  async searchCustomer(name) {
    await this.searchBox.fill(name);
    //await this.page.getByText(name).toBeVisible();
    await this.page.getByText(name).click();
    await expect(this.page.getByRole('heading', { name: name })).toBeVisible();
  }

  async addCustDetails(name) {
    await this.customerTab.click();
    await this.searchCustomer(name);
    let value = await this.addressLine1.textContent()//await this.addressLine1Inp.inputValue();
    if (value === '')
      await this.fillAddressDetails()
    else
      console.log("Address already exists for this customer");

    let val = await this.contactName.textContent()

    if (!val || val.trim() === '') {
      const { name, email, phone } = testchamber();
      await this.contactNameInp.fill(name);
      await this.contactPos.selectOption('0'); // Select the first option in the position dropdown
      await this.contactPhoneInp.fill(phone);
      await this.contactEmailInp.fill(email);
      await this.contactOKBtn.click();
      console.log("Contact added successfully with name: ", name);
    }
    else
      console.log("Contact already exists for this customer")
  }

  async fillAddressDetails() {
    const { addressLine1, city, state, zipCode } = testchamber();
    await this.addressLine1Inp.fill(addressLine1);
    await this.cityInp.fill(city);
    await this.stateInp.fill(state);
    await this.zipCodeInp.fill(zipCode);
    await this.okayBtn.click();
    expect(this.page.getByText(addressLine1)).toBeVisible();
    expect(this.page.getByText(city)).toBeVisible();
  }
}
