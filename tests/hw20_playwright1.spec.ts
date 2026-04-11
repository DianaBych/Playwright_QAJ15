import { test, expect } from "@playwright/test";

test.describe("UI Tests without Codegen", () => {
  //Логин с валидными данными
  test("TEST №1 Login with valid credentials", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page.locator(".inventory_item")).toHaveCount(6);
  });

  //Добавление товара в корзину
  test("TEST №2 Add product to cart and verify", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");

    await page.click("#add-to-cart-sauce-labs-backpack");
    await expect(page.locator(".shopping_cart_link")).toHaveText("1");

    await page.click(".shopping_cart_link");
    await expect(page.locator(".cart_item")).toHaveCount(1);
    await expect(page.locator(".inventory_item_name")).toContainText(
      "Sauce Labs Backpack",
    );
  });

  test.describe("UI Tests with Codegen", () => {
    //Оформления заказа
    test("TEST №3 Complete checkout process", async ({ page }) => {
      await page.goto("https://www.saucedemo.com/");
      await page.locator('[data-test="username"]').click();
      await page.locator('[data-test="username"]').fill("standard_user");
      await page.locator('[data-test="password"]').click();
      await page.locator('[data-test="password"]').fill("secret_sauce");
      await page.locator('[data-test="login-button"]').click();
      await page
        .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        .click();
      await page.locator('[data-test="shopping-cart-link"]').click();
      await page.locator('[data-test="checkout"]').click();
      await page.locator('[data-test="firstName"]').click();
      await page.locator('[data-test="firstName"]').fill("Diana");
      await page.locator('[data-test="lastName"]').click();
      await page.locator('[data-test="lastName"]').fill("Bychkova");
      await page.locator('[data-test="postalCode"]').click();
      await page.locator('[data-test="postalCode"]').fill("12/444");
      await page.locator('[data-test="continue"]').click();
      await page.locator('[data-test="finish"]').click();

      await expect(page.locator(".pony_express")).toBeVisible();
      await expect(page.locator(".complete-header")).toHaveText(
        "Thank you for your order!",
      );
    });

    //Фильтрация товаров по цене
    test("TEST №4 Filter products by price", async ({ page }) => {
      await page.goto("https://www.saucedemo.com/");
      await page.locator('[data-test="username"]').click();
      await page.locator('[data-test="username"]').fill("standard_user");
      await page.locator('[data-test="password"]').click();
      await page.locator('[data-test="password"]').fill("secret_sauce");
      await page.locator('[data-test="login-button"]').click();
      await page.getByText("Name (A to Z)Name (A to Z)").click();
      await page
        .locator('[data-test="product-sort-container"]')
        .selectOption("lohi");

      await expect(
        page.locator('[data-test="inventory-item-price"]').first(),
      ).toContainText("$7.99");
    });

    //Логин с заблокированным пользователем
    test("TEST №5 Login with locked out user", async ({ page }) => {
      await page.goto("https://www.saucedemo.com/");
      await page.locator('[data-test="username"]').click();
      await page.locator('[data-test="username"]').fill("locked_out_user");
      await page.locator('[data-test="password"]').click();
      await page.locator('[data-test="password"]').fill("secret_sauce");
      await page.locator('[data-test="login-button"]').click();

      await expect(page.locator('[data-test="error"]')).toContainText(
        "Sorry, this user has been locked out",
      );
    });
  });
});
