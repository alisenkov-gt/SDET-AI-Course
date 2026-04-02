import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SidebarPage extends BasePage {
  readonly menuButton: Locator;
  readonly closeButton: Locator;
  readonly logoutLink: Locator;
  readonly resetAppLink: Locator;

  constructor(page: Page) {
    super(page);
    this.menuButton = page.locator('[data-test="react-burger-menu-btn"], #react-burger-menu-btn');
    this.closeButton = this.getByTestId('react-burger-cross-btn');
    this.logoutLink = this.getByTestId('logout-sidebar-link');
    this.resetAppLink = this.getByTestId('reset-sidebar-link');
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click({ timeout: 15000, force: true });
  }

  async closeMenu(): Promise<void> {
    await this.closeButton.click();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async resetApp(): Promise<void> {
    await this.openMenu();
    await this.resetAppLink.click();
  }
}
