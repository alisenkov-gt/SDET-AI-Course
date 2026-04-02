import { expect, test } from '../../src/utils/BaseTest';
import { LoginPage } from '../../src/pages/LoginPage';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';
import { CartPage } from '../../src/pages/CartPage';
import { SidebarPage } from '../../src/pages/SidebarPage';
import { Page } from "@playwright/test";

const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
};

const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
const prices: Record<string, number> = {
  'Sauce Labs Backpack': 29.99,
  'Sauce Labs Bike Light': 9.99,
};

const loginAs = async (page: Page, username: string, password: string) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(username, password);
  return loginPage;
};

test.describe('SauceDemo flows', () => {
  test('standard user can sort inventory by price low to high', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Initialization
    await loginAs(page, users.standard.username, users.standard.password);
    await inventoryPage.waitForLoaded();

    // User actions
    await inventoryPage.sortBy('lohi');

    // Verification
    await inventoryPage.assertSortValue('lohi');
    await expect(inventoryPage.cartLink).toBeVisible();
    await expect((await inventoryPage.getItemNames())[0]).toBe('Sauce Labs Onesie');
  });

  test('locked out user sees locked message', async ({ page }) => {
    const loginPage = await loginAs(page, users.locked.username, users.locked.password);
    await loginPage.assertError('locked out');
  });

  test('missing username shows required error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('', users.standard.password);
    await loginPage.assertError('Username is required');
  });

  test('missing password shows required error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(users.standard.username, '');
    await loginPage.assertError('Password is required');
  });

  test('cart badge increases when adding one item', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await loginAs(page, users.standard.username, users.standard.password);
    await inventoryPage.waitForLoaded();

    await inventoryPage.addItem(items[0]);
    await inventoryPage.assertCartCount(1);
  });

  test('cart shows multiple added items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await loginAs(page, users.standard.username, users.standard.password);
    await inventoryPage.waitForLoaded();

    await inventoryPage.addItem(items[0]);
    await inventoryPage.addItem(items[1]);
    await inventoryPage.assertCartCount(2);
    await inventoryPage.openCart();

    await cartPage.assertItemVisible(items[0]);
    await cartPage.assertItemVisible(items[1]);
  });

  test('removing item from cart updates badge', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await loginAs(page, users.standard.username, users.standard.password);
    await inventoryPage.waitForLoaded();

    await inventoryPage.addItem(items[0]);
    await inventoryPage.addItem(items[1]);
    await inventoryPage.assertCartCount(2);
    await inventoryPage.openCart();

    await cartPage.removeItem(items[1]);
    await inventoryPage.assertCartCount(1);
  });

  test('continue shopping returns to inventory', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await loginAs(page, users.standard.username, users.standard.password);
    await inventoryPage.waitForLoaded();

    await inventoryPage.addItem(items[0]);
    await inventoryPage.openCart();
    await cartPage.continueShopping();
    await inventoryPage.waitForLoaded();
  });

  test('reset app clears cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const sidebarPage = new SidebarPage(page);
    await loginAs(page, users.standard.username, users.standard.password);
    await inventoryPage.waitForLoaded();

    await inventoryPage.addItem(items[0]);
    await inventoryPage.addItem(items[1]);
    await inventoryPage.assertCartCount(2);

    await sidebarPage.resetApp();
    await expect(inventoryPage.cartBadge).toBeHidden();
  });

  test('checkout requires first name', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);
    await loginAs(page, users.standard.username, users.standard.password);
    await inventoryPage.waitForLoaded();

    await inventoryPage.addItem(items[0]);
    await inventoryPage.openCart();
    await checkoutPage.startCheckout();
    await checkoutPage.continue();
    await checkoutPage.assertError('First Name is required');
  });

  test('checkout requires last name', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);
    await loginAs(page, users.standard.username, users.standard.password);
    await inventoryPage.waitForLoaded();

    await inventoryPage.addItem(items[0]);
    await inventoryPage.openCart();
    await checkoutPage.startCheckout();
    await checkoutPage.fillInfo('John', '', '12345');
    await checkoutPage.continue();
    await checkoutPage.assertError('Last Name is required');
  });

  test('checkout requires postal code', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);
    await loginAs(page, users.standard.username, users.standard.password);
    await inventoryPage.waitForLoaded();

    await inventoryPage.addItem(items[0]);
    await inventoryPage.openCart();
    await checkoutPage.startCheckout();
    await checkoutPage.fillInfo('John', 'Doe', '');
    await checkoutPage.continue();
    await checkoutPage.assertError('Postal Code is required');
  });

  test('subtotal reflects sum of items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await loginAs(page, users.standard.username, users.standard.password);
    await inventoryPage.waitForLoaded();

    await inventoryPage.addItem(items[0]);
    await inventoryPage.addItem(items[1]);
    await inventoryPage.openCart();
    await cartPage.assertItemVisible(items[0]);
    await cartPage.assertItemVisible(items[1]);

    await checkoutPage.startCheckout();
    await checkoutPage.fillInfo('John', 'Doe', '12345');
    await checkoutPage.continue();
    await checkoutPage.assertSummaryPresent();

    const subtotal = await checkoutPage.getSubtotal();
    const expectedTotal = prices[items[0]] + prices[items[1]];
    await expect(subtotal).toBeCloseTo(expectedTotal, 2);
  });

  test('happy path checkout completes order', async ({ page, testData }) => {
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);
    await loginAs(page, users.standard.username, users.standard.password);
    await inventoryPage.waitForLoaded();

    await inventoryPage.addItem(items[0]);
    await inventoryPage.openCart();
    await checkoutPage.startCheckout();
    await checkoutPage.fillInfo(testData.firstName, testData.lastName, testData.postalCode);
    await checkoutPage.continue();
    await checkoutPage.assertSummaryPresent();
    await checkoutPage.finish();
    await checkoutPage.assertCompletion();
    await expect(page).toHaveURL(/checkout-complete/);
  });
});
