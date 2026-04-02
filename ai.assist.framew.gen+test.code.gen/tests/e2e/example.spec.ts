import { expect, test } from '../../src/utils/BaseTest';
import { LoginPage } from '../../src/pages/LoginPage';

test.describe('SauceDemo login smoke', () => {
  test('invalid credentials show an error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('invalid_user', 'wrong_password');
    await loginPage.assertError('Epic sadface');
    await expect(loginPage.usernameInput).toBeVisible();
  });
});
