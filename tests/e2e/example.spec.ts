import { expect, test } from '../../src/utils/BaseTest';
import { HomePage } from '../../src/pages/HomePage';

const docsHeading = /installation/i;

test.describe('Playwright docs smoke', () => {
  test('user can reach docs with generated data', async ({ page, testData }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.waitForUrl('playwright');
    await expect(homePage.getStartedLink).toBeVisible();

    await homePage.click(homePage.getStartedLink);
    await homePage.waitForUrl('docs');
    await expect(page.getByRole('heading', { name: docsHeading })).toBeVisible();

    await expect.soft(testData.email).toContain('@');
  });
});
