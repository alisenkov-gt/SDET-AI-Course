import { expect, test } from '@playwright/test';
import { PlaywrightHomePage } from '../src/pages/PlaywrightHomePage';

test.describe('Playwright main navigation', () => {
  test('main page displays Docs, API, and Community navigation links', async ({ page }) => {
    const homePage = new PlaywrightHomePage(page);

    // Initialization
    await homePage.open();

    // User actions
    await homePage.assertNavigationVisible();

    // Verification
    await homePage.assertNavigationDestinations();
  });

  test('navigation links open the expected pages', async ({ page }) => {
    const homePage = new PlaywrightHomePage(page);

    // Initialization
    await homePage.open();

    // User actions
    await page.locator('#docs').click();
    await page.waitForTimeout(2000);
    await homePage.assertDocsPage();
    await homePage.returnHome();
    await homePage.openApi();
    await homePage.assertApiPage();
    await homePage.returnHome();
    await homePage.openCommunity();

    // Verification
    await homePage.assertCommunityPage();
  });
});
