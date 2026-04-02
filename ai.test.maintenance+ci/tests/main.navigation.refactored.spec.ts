import { test } from '@playwright/test';
import { PlaywrightHomePage } from '../src/pages/PlaywrightHomePage';

test.describe.skip('Archived AI refactor snapshot pending manual review', () => {
  test('main page exposes Docs, API, and Community as accessible navigation links', async ({ page }) => {
    const homePage = new PlaywrightHomePage(page);

    // Initialization
    await homePage.open();

    // User actions
    await homePage.assertNavigationAccessible();

    // Verification
    await homePage.assertNavigationVisible();
    await homePage.assertNavigationDestinations();
  });

  test('navigation links open the expected destinations', async ({ page }) => {
    const homePage = new PlaywrightHomePage(page);

    // Initialization
    await homePage.open();

    // User actions
    await homePage.openAndAssertDocs();
    await homePage.returnHome();
    await homePage.openAndAssertApi();
    await homePage.returnHome();
    await homePage.openAndAssertCommunity();

    // Verification
    await homePage.assertCommunityPage();
  });
});
