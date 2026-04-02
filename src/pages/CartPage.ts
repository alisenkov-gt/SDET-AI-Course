import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartList: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartList = this.getByTestId('cart-list');
    this.continueShoppingButton = this.getByTestId('continue-shopping');
    this.checkoutButton = this.getByTestId('checkout');
  }

  itemNameLocator(itemName: string): Locator {
    return this.inventoryItemByName(itemName).first();
  }

  removeButton(itemName: string): Locator {
    return this.getByTestId(`remove-${this.slugifyProduct(itemName)}`);
  }

  async assertItemVisible(itemName: string): Promise<void> {
    const item = this.itemNameLocator(itemName);
    await expect(item).toBeVisible();
  }

  async removeItem(itemName: string): Promise<void> {
    await this.removeButton(itemName).click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}
