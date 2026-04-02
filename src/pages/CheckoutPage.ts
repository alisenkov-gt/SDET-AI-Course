import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly subtotalLabel: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = this.getByTestId('checkout');
    this.firstNameInput = this.getByTestId('firstName');
    this.lastNameInput = this.getByTestId('lastName');
    this.postalCodeInput = this.getByTestId('postalCode');
    this.continueButton = this.getByTestId('continue');
    this.finishButton = this.getByTestId('finish');
    this.completeHeader = this.getByTestId('complete-header');
    this.subtotalLabel = this.getByTestId('subtotal-label');
    this.errorMessage = this.getByTestId('error');
  }

  async startCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async fillInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async assertSummaryPresent(): Promise<void> {
    await expect(this.subtotalLabel).toBeVisible();
  }

  async assertCompletion(): Promise<void> {
    await expect(this.completeHeader).toHaveText(/thank you for your order/i);
  }

  async assertError(message: string): Promise<void> {
    await expect(this.errorMessage).toContainText(message);
  }

  async getSubtotal(): Promise<number> {
    const text = await this.subtotalLabel.textContent();
    const match = text?.match(/Item total:\s*\$(\d+\.\d+)/i);
    return match ? Number(match[1]) : NaN;
  }
}
