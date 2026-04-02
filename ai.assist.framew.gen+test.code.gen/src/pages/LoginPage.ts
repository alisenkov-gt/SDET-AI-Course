import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { Page, Locator } from '@playwright/test';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = this.getByTestId('username');
    this.passwordInput = this.getByTestId('password');
    this.loginButton = this.getByTestId('login-button');
    this.errorMessage = this.getByTestId('error');
  }

  async open(): Promise<void> {
    await this.navigate('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertError(message: string): Promise<void> {
    await expect(this.errorMessage).toContainText(message);
  }
}

