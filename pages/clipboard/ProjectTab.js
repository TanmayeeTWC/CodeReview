import { expect } from '@playwright/test';
import path from 'path';
import { testchamber } from '../../helpers/clipboard/addressGeneratorHelper.js';

export class ProjectTab {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.createProjectBtn = page.getByRole('link', { name: ' Project' })
    this.projectName = page.getByRole('textbox', { name: 'Project Name' });
    this.jobNumber = page.getByRole('textbox', { name: 'Project Number' });
    this.status = page.getByLabel('Status')
    this.customer = page.getByLabel('Customer')
    this.createProjectButton = page.getByRole('button', { name: 'Create Project' })
    this.searchBox = page.getByRole('textbox', { name: 'search' })

    this.addressLine = page.getByText('address', { exact: true })
    this.addressLineInp = page.getByRole('textbox', { name: 'address line 1' })
    this.cityInp = page.getByRole('textbox', { name: 'city' })
    this.stateInp = page.getByRole('textbox', { name: 'state' })
    this.zipCodeInp = page.getByRole('textbox', { name: 'zip code' })
    this.okayBtn = page.locator('form[name="editAddressForm"]').getByRole('button', { name: '' }) // Tick button for address

    this.contactName = page.locator('//form[@name="editCustomerContactForm"]/span[2]')//getByRole('textbox', { name: 'contact name' });
    this.contactNameInp = page.getByRole('textbox', { name: 'contact name' })
    this.contactPos = page.getByRole('combobox')
    this.contactPhoneInp = page.getByRole('textbox', { name: 'contact phone' })
    this.contactEmailInp = page.getByRole('textbox', { name: 'contact email' })
    this.contactOKBtn = page.locator('form[name="editContactForm"]').getByRole('button', { name: '' })

    this.formBtn = page.getByRole('link', { name: 'Forms' });
    this.selectCG = page.getByRole('combobox')
    this.addCGBtn = page.getByRole('button', { name: ' Component Group' })
    this.addChildBtn = page.locator("//button[@ng-click='open(child)']");
    this.addEquipment = page.locator("//button[@ng-click='addSubComponents(child)']")
    this.editForm = page.getByRole('button', { name: '' })
    this.quesInp = page.locator("//tr[@on='question.answer_type'][1]//input[@bo-id='question.name']")
    this.expandBtn = page.locator("//span[@class='icon-angle-right']")
    this.magnifyBtn = page.locator("//span[@class='icon-search']") // Magnify button to expand the form
    this.deficiencyTab = page.getByRole('link', { name: 'Deficiency' })
    this.defType = page.getByLabel('Type*')
    this.defStatus = page.getByLabel('Status*')
    this.defAssignedTo = page.getByLabel('Assign To*')
    this.defDesc = page.locator('#ddescr').nth(1)
    this.saveDefBtn = page.getByRole('button', { name: 'Save Deficiency' })
    this.closeDefBtn = page.getByRole('button', { name: 'Close' })
    this.uploadDefImgBtn = page.getByRole('button', { name: ' Upload' })
    this.defCloseBtn = page.getByRole('button', { name: 'Close' })
    this.chooseImgBtn = page.getByRole('button', { name: 'Choose Image' })

    this.attachmentsBTN = page.getByRole('link', { name: 'Attachments' });
    this.uploadLink = page.locator("//input[@type='file']")
    this.fileNameInp = page.getByPlaceholder("File Name")
    this.uploadAttachmentBtn = page.getByRole('button', { name: 'Upload Attachment' }) // Button to upload attachment
    this.saveAttachmentBtn = page.getByRole('button', { name: 'Save Attachment' }) // Button to save attachment;
    this.savedMsg = page.locator("//p[@ng-show='attachment.saved']")

    this.reportTab = page.getByRole('link', { name: 'Reports' });
    this.allEquipLink = page.getByRole('link', { name: 'All Equipment' });
    this.defLink = page.getByRole('link', { name: 'Deficiencies' });
    this.reportTitle = page.locator('#report_title')
    this.downloadReportBtn = page.getByRole('button', { name: 'Download Report' });

  }

  async createProject(projectName, jobNumber, customerName) {
    await this.page.waitForTimeout(3000)
    await this.createProjectBtn.click();
    await this.projectName.fill(projectName);
    await this.jobNumber.fill(jobNumber);
    await this.status.selectOption('Active');
    await this.customer.selectOption({ label: customerName });
    await this.createProjectButton.click();
    await expect(this.page.getByText(projectName)).toBeVisible();
  }

  async searchProject(name) {

    await this.searchBox.fill(name);
    await this.page.getByText(name).click();
    await expect(this.page.getByRole('heading', { name: name })).toBeVisible();
  }

  async addProjectDetails(name, phone, email) {

    await this.searchProject(name);
    //await this.page.getByText(name).click();
    let value = await this.addressLine.textContent()
    console.log('Adress: ', value)//await this.addressLine1Inp.inputValue();  //can also check if state, zipcode is empty but just checking addressline 1 since we won't put partial address
    if (value === 'address') {
      await this.addressLine.click()
      await this.fillAddressDetails()
    }
    else
      console.log("Address already exists for this customer");

    let val = await this.contactNameInp.textContent()
    console.log("Contact Name: ", val);
    console.log("Contact Name: ", val.trim().length);

    if (!val || val.trim() === '') {
      await this.contactNameInp.fill(name);
      await this.contactPos.selectOption('0'); // Select the first option in the position dropdown
      await this.contactPhoneInp.fill(phone);
      await this.contactEmailInp.fill(email);
      await this.contactOKBtn.click();
    }
    else
      console.log("Contact already exists for this customer")
  }

  async fillAddressDetails() {
    const { addressLine1, city, state, zipCode } = testchamber();
    await this.addressLineInp.fill(addressLine1);
    await this.cityInp.fill(city);
    await this.stateInp.fill(state);
    await this.zipCodeInp.fill(zipCode);
    await this.okayBtn.click();
    await this.page.waitForTimeout(3000); // Wait for the address to be saved
  }

  async assignAndInputForm(projecName, formName, ans1, ans2) {
    await this.searchProject(projecName);
    //  await this.page.getByText(projecName).click();
    await this.formBtn.click();
    await expect(this.selectCG).toBeVisible();
    await this.selectCG.click();
    await this.selectCG.selectOption({ label: formName });
    await this.addCGBtn.click();
    await this.addChildBtn.click();
    await this.addEquipment.click();
    await this.editForm.click();
    await this.quesInp.nth(0).fill(ans1);
    await this.quesInp.nth(1).fill(ans2);
    const val = this.quesInp.nth(2).innerText()
    console.log("Question: ", val);
  }

  async searchProject(projectName) {
    await this.searchBox.fill(projectName);
    await expect(this.page.getByText(projectName)).toBeVisible();
    await this.page.getByText(projectName).click();
  }

  async reportDeficiencyWithImg(projectName, deficiencyDesc) {
    await this.searchProject(projectName)
    await this.formBtn.click();
    await this.expandBtn.click();
    await this.editForm.click();
    await expect(this.magnifyBtn.nth(1)).toBeVisible();
    await this.magnifyBtn.nth(1).click();
    await this.deficiencyTab.click();
    await this.defType.selectOption('1');
    await this.defStatus.selectOption('1');
    await this.defAssignedTo.selectOption('1');
    await this.defDesc.fill(deficiencyDesc);
    await this.saveDefBtn.click();
    await expect(this.page.getByText('Deficiency Saved.')).toBeVisible();
    const uploadsFolder = path.resolve(__dirname, '../../uploads');
    const fileName = 'world map.png';
    const filePath = path.join(uploadsFolder, fileName);
    await this.page.setInputFiles("//input[@ng-disabled='deficiencyImageWorking'][@type='file']", filePath);
    await this.uploadDefImgBtn.click();
    await this.closeDefBtn.click();
    await this.magnifyBtn.nth(1).click();
    await expect(this.page.getByRole('img')).toBeVisible();
    await this.defCloseBtn.click();

  }

  async uploadAttachment(projectName) {

    await this.searchProject(projectName);
    const uploadsFolder = path.resolve(__dirname, '../../uploads');
    const fileName = 'PDF_TestPage.pdf';
    const filePath = path.join(uploadsFolder, fileName);
    await this.attachmentsBTN.click();
    await this.page.setInputFiles("//input[@type='file']", filePath)
    await expect(this.fileNameInp).toBeVisible();
    await this.fileNameInp.fill('Automation Attachment');
    await this.uploadAttachmentBtn.click();
    await this.saveAttachmentBtn.click();
    await expect(this.savedMsg).toHaveText('Your changes have been saved.');
  }

  async downloadProjectReport(projectName, reporttype) {
    await this.searchProject(projectName)
    await this.reportTab.click();
    await this.page.getByRole('button', { name: 'Download Report' }).click();
  }

  async downloadReport(name, reportType) {
    await this.searchProject(name);
    await this.reportTab.click();
    if (reportType === 'All Equipment') {
      await this.allEquipLink.click();
    }
    else if (reportType === 'Deficiencies') {
      await this.defLink.click();
    } else {
      throw new Error('Invalid report type');
    }
    await this.reportTitle.click()
    await this.reportTitle.fill("Automation report ");
    await this.downloadReportBtn.click();
    await expect(this.page.getByText("Report generation started...")).toBeVisible();
    //await expect(this.downloadReportBtn).toBeEnabled();
    await expect(this.page.getByText("Your report has been generated and can now be viewed from the report archive")).toBeVisible({ timeout: 20000 });
    await this.reportTab.click();
    await expect(this.page.getByText("Automation-report")).toBeVisible();

  }
}