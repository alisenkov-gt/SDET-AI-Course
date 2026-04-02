import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly inventoryList: Locator;
  readonly sortDropdown: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryList = this.getByTestId('inventory-list');
    this.sortDropdown = this.getByTestId('product-sort-container');
    this.cartLink = this.getByTestId('shopping-cart-link');
    this.cartBadge = this.cartLink.locator('.shopping_cart_badge');
  }

  async waitForLoaded(): Promise<void> {
    await expect(this.inventoryList).toBeVisible();
  }

  async sortBy(value: string): Promise<void> {
    await this.sortDropdown.selectOption(value);
  }

  async assertSortValue(value: string): Promise<void> {
    await expect(this.sortDropdown).toHaveValue(value);
  }

  private addButtonFor(itemName: string): Locator {
    return this.getByTestId(`add-to-cart-${this.slugifyProduct(itemName)}`);
  }

  private removeButtonFor(itemName: string): Locator {
    return this.getByTestId(`remove-${this.slugifyProduct(itemName)}`);
  }

  itemNameLocator(itemName: string): Locator {
    return this.inventoryItemByName(itemName);
  }

  async getItemNames(): Promise<string[]> {
    return this.page.getByTestId('inventory-item-name').allTextContents();
  }

  async addItem(itemName: string): Promise<void> {
    await this.addButtonFor(itemName).click();
  }

  async removeItem(itemName: string): Promise<void> {
    await this.removeButtonFor(itemName).click();
  }

  async assertItemVisible(itemName: string): Promise<void> {
    await expect(this.itemNameLocator(itemName)).toBeVisible();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async assertCartCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
  }
}
