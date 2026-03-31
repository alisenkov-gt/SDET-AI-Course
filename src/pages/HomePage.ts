import { BasePage } from './BasePage';
import { Locator, Page } from '@playwright/test';

export class HomePage extends BasePage {
  readonly getStartedLink: Locator;

  constructor(page: Page) {
    super(page);
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
  }

  async open(): Promise<void> {
    await this.navigate('/');
  }
}
