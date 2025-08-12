import { expect } from '@playwright/test';
export class FormTemplates {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {

    this.page = page;
    this.formTemplatesTab = page.getByRole('link', { name: 'Form Templates' });
    this.formTemplateNameInp = page.getByPlaceholder("New Template Name");
    this.createBtn = page.getByRole('button', { name: 'Create Template' });
    this.editIcon = page.getByRole('button', { name: '' })//locator("//span[@class='icon-pencil2']")
    this.createACategory = page.getByRole('button', { name: 'Create a Category' })
    this.addCategory = page.getByRole('button', { name: 'Category' })//locator("//div[@class='category-controls']/span[2]/button")
    this.catName = page.getByPlaceholder("Category Name")
    this.quesPopup = page.locator("//span[@class='icon-container']")
    this.questionInp = page.getByRole('textbox', { name: 'Label:' })//locator("//input[@id='label{$index}']")
    this.addQuestion = page.getByTitle('Add a Question')
    this.operand1 = page.locator("//select[@id='token0']")
    this.operand2 = page.locator("//select[@id='token1']")
    this.saveFormulaAssign = page.getByRole('button', { name: 'Save' })//locator("//tbody[@class='ng-scope'][3]//button[@ng-click='save()']")//page.getByText("Save")

    this.manageFormula = page.getByRole('link', { name: 'Manage Formulas' });
    this.createFormTemplate = page.getByRole('button', { name: 'New Master Template' });
    this.creatFormula = page.getByRole('button', { name: ' Create a New Formula' })  //getByText("Create a New Formula");
    this.formulaName = page.locator("//input[@ng-model='formula.description']") //locator('form[name="formulaBuilder"] div').filter({ hasText: 'Formula Description' }).getByRole('textbox')
    this.fieldLabel = page.getByRole('textbox', { name: 'Field Label' })
    this.newField = page.locator("//span[contains(@class,'FormulaField')]")  // this button is dynamic so locator would be best use
    this.operator = page.getByText('x') //hard coded value
    this.saveFormula = page.getByText("Save Formula");

  }

  async addFormula(name, field1, field2) {

    await this.formTemplatesTab.click();
    await this.manageFormula.click();
    await this.creatFormula.click();
    await this.formulaName.click();
    await this.formulaName.fill(name);
    await this.fieldLabel.fill(field1);
    await this.newField.click();
    await this.operator.click();
    await this.fieldLabel.fill(field2);
    await this.newField.nth(1).click();
    await this.saveFormula.click();
    await expect(this.page.getByText(name)).toBeVisible();
  }

  async createEquipmentTemplate(name, formName) {
    await this.formTemplatesTab.click();
    await this.createFormTemplate.click();
    await this.formTemplateNameInp.fill(name);
    await this.createBtn.click();
    await expect(this.editIcon).toBeVisible();
    await this.editIcon.click();
    await expect(this.createACategory).toBeVisible();
    await this.createACategory.click();
    await expect(this.catName).toBeVisible();
    await this.catName.fill("Equipment");
    await expect(this.quesPopup).toBeVisible();
    await this.quesPopup.click();
    await expect(this.questionInp).toBeVisible();
    await this.questionInp.fill("Quantity");
    await this.addQuestion.click();

    const quesInp = this.page.locator('[id="label\\{\\$index\\}"]')
    await quesInp.nth(1).fill("Cost");
    await this.addQuestion.click();
    await quesInp.nth(2).fill("Total");
    await this.page.locator("//tbody[@class='ng-scope'][3]//select[@ng-model='field.answer_type']").selectOption('3');
    await this.page.locator("//tbody[@class='ng-scope'][3]//select[@id='formula-sel']").selectOption({ label: formName });
    await this.operand1.selectOption('0');
    await this.operand2.selectOption('1');
    await this.saveFormulaAssign.click();
    await expect(this.page.getByRole('heading', { name: name })).toBeVisible();
  }
}