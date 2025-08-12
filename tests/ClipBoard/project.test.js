const { test, expect } = require('@playwright/test');
import { loginHelper } from '../../helpers/clipboard/loginHelper.js';
import { ProjectTab } from '../../pages/clipboard/ProjectTab.js';
import { testchamber } from '../../helpers/clipboard/addressGeneratorHelper.js';

test.describe('Login and test', () => {
    // Don't run the rest of the tests after the first failure
    test.describe.configure({ mode: 'serial' });
    let login;
    let projectTab;
    let name, phone, email

    test.beforeAll(() => {
        const data = testchamber();
        name = data.name;
        phone = data.phone;
        email = data.email;
    })

    test.beforeEach(async ({ page }) => {

        login = new loginHelper(page)
        projectTab = new ProjectTab(page);
        await login.login();
    })

    test('Create Project', async ({ page }) => {
        await projectTab.createProject(name, phone, 'bulk test3');
    });

    test('Add Projects Details Test', async ({ page }) => {
        await projectTab.addProjectDetails(name, phone, email);
        await expect(page.getByText(name)).toBeVisible();
    });

    test('Assign and input form', async ({ page }) => {
        await projectTab.assignAndInputForm(name, 'for automation', '2', '3');
    });

    test('Report Deficiency', async ({ page }) => {
        await projectTab.reportDeficiencyWithImg(name, 'Test Deficiency');
    });

    test('Upload attachment', async ({ page }) => {
        await projectTab.uploadAttachment(name)
    });

    test('Check reports', async ({ page }) => {
        await projectTab.downloadReport(name, "All Equipment");
    });
});