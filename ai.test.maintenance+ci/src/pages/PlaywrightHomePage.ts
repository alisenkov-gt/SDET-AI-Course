import { expect, Locator, Page } from '@playwright/test';

export class PlaywrightHomePage {
  readonly page: Page;
  readonly navigation: Locator;
  readonly docsLink: Locator;
  readonly apiLink: Locator;
  readonly communityLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigation = page.getByRole('navigation');
    this.docsLink = page.getByRole('link', { name: 'Docs' });
    this.apiLink = page.getByRole('link', { name: 'API' });
    this.communityLink = page.getByRole('link', { name: 'Community' });
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async assertNavigationVisible(): Promise<void> {
    await expect(this.docsLink).toBeVisible();
    await expect(this.apiLink).toBeVisible();
    await expect(this.communityLink).toBeVisible();
  }

  async assertNavigationAccessible(): Promise<void> {
    await expect(this.navigation).toBeVisible();
    await expect(this.navigation.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect(this.navigation.getByRole('link', { name: 'API' })).toBeVisible();
    await expect(this.navigation.getByRole('link', { name: 'Community' })).toBeVisible();
  }

  async assertNavigationLinksUniqueAndEnabled(): Promise<void> {
    await expect(this.navigation.getByRole('link', { name: 'Docs', exact: true })).toHaveCount(1);
    await expect(this.navigation.getByRole('link', { name: 'API', exact: true })).toHaveCount(1);
    await expect(this.navigation.getByRole('link', { name: 'Community', exact: true })).toHaveCount(1);

    await expect(this.docsLink).toBeEnabled();
    await expect(this.apiLink).toBeEnabled();
    await expect(this.communityLink).toBeEnabled();

    await expect(this.docsLink).not.toHaveAttribute('aria-disabled', 'true');
    await expect(this.apiLink).not.toHaveAttribute('aria-disabled', 'true');
    await expect(this.communityLink).not.toHaveAttribute('aria-disabled', 'true');
  }

  async assertNavigationDestinations(): Promise<void> {
    await expect(this.docsLink).toHaveAttribute('href', '/docs/intro');
    await expect(this.apiLink).toHaveAttribute('href', '/docs/api/class-playwright');
    await expect(this.communityLink).toHaveAttribute('href', '/community/welcome');
  }

  async openDocs(): Promise<void> {
    await this.docsLink.click();
  }

  async openApi(): Promise<void> {
    await this.apiLink.click();
  }

  async openCommunity(): Promise<void> {
    await this.communityLink.click();
  }

  async returnHome(): Promise<void> {
    await this.page.goto('/');
  }

  async openAndAssertDocs(): Promise<void> {
    await this.openDocs();
    await this.assertDocsPage();
  }

  async openAndAssertApi(): Promise<void> {
    await this.openApi();
    await this.assertApiPage();
  }

  async openAndAssertCommunity(): Promise<void> {
    await this.openCommunity();
    await this.assertCommunityPage();
  }

  async assertPrimaryNavigationContract(): Promise<void> {
    await this.assertNavigationAccessible();
    await this.assertNavigationVisible();
    await this.assertNavigationLinksUniqueAndEnabled();
    await this.assertNavigationDestinations();
  }

  async assertDocsPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/docs\/intro/);
    await expect(this.page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  }

  async assertApiPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/docs\/api\/class-playwright/);
    await expect(this.page.getByRole('heading', { name: 'Playwright' })).toBeVisible();
  }

  async assertCommunityPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/community\/welcome/);
    await expect(this.page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
  }
}
