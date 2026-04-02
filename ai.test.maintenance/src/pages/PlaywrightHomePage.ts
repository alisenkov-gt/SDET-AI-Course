import { expect, Locator, Page } from '@playwright/test';

export class PlaywrightHomePage {
  readonly page: Page;
  readonly docsLink: Locator;
  readonly apiLink: Locator;
  readonly communityLink: Locator;

  constructor(page: Page) {
    this.page = page;
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
