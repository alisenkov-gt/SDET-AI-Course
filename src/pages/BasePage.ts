import { Page, Locator, Response } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string): Promise<Response | null> {
    return this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async waitForUrl(partial: string): Promise<void> {
    await this.page.waitForURL((url) => url.toString().includes(partial));
  }

  async click(locator: Locator | string): Promise<void> {
    const target = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await target.click();
  }

  async type(locator: Locator | string, text: string): Promise<void> {
    const target = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await target.fill(text);
  }

  async isVisible(locator: Locator | string): Promise<boolean> {
    const target = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return target.isVisible();
  }
}

