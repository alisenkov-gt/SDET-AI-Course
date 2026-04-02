import { test } from '@playwright/test';
import { PlaywrightHomePage } from '../src/pages/PlaywrightHomePage';

const traceabilityId = 'TC-NAV-001';

test.describe.skip('Archived professional snapshot retained for chapter history', () => {
  test(`${traceabilityId} validates visible, accessible, and correctly targeted primary navigation links`, async ({
    page,
  }) => {
    const homePage = new PlaywrightHomePage(page);

    // Initialization
    await homePage.open();

    // User actions
    await homePage.assertPrimaryNavigationContract();

    // Verification
    await homePage.assertNavigationDestinations();
  });

  test(`${traceabilityId} validates Docs, API, and Community open their expected destinations`, async ({
    page,
  }) => {
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

  test(`${traceabilityId} keeps exactly one enabled required link per destination inside the primary navigation`, async ({
    page,
  }) => {
    const homePage = new PlaywrightHomePage(page);

    // Initialization
    await homePage.open();

    // User actions
    await homePage.assertNavigationAccessible();

    // Verification
    await homePage.assertNavigationLinksUniqueAndEnabled();
  });
});
