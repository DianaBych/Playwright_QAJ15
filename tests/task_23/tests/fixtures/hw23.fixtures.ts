import { expect, test as base, type Page } from "@playwright/test";

async function loginStandardUser(page: Page) {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.locator('#login-button').click();
  await page.waitForURL("**/inventory.html");
}

async function addTwoItemsToCartFromInventory(page: Page) {
  await page
    .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
    .click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await expect(page.locator(".shopping_cart_badge")).toHaveText("2");
}

type Fixtures = {
  standardPage: Page;
  standardPageWithTwoItems: Page;
};

export const test = base.extend<Fixtures>({
  standardPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await loginStandardUser(page);
    await use(page);
    await context.close();
  },

  standardPageWithTwoItems: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await loginStandardUser(page);
    await addTwoItemsToCartFromInventory(page);
    await use(page);
    await context.close();
  },
});

export { expect };

