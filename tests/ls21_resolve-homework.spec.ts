import { test, expect } from "@playwright/test";

test.describe("Testing different types of assertions", () => {
  // APIResponseAssertions
  test("Test №1 APIResponseAssertions", async ({
    page,
  }) => {
    const response = await page.request.get("https://www.saucedemo.com/");

    expect(response).toBeOK();
    expect(response.status()).toBe(200);
  });

  // GenericAssertions
  test("Test №2 GenericAssertions", async ({
    page,
  }) => {
    const productPrice = 29.99;
    const productName = "Sauce Labs Backpack";
    const itemCount = 6;

    expect(productPrice).toBeGreaterThan(20);
    expect(productPrice).toBeLessThan(50);
    expect(productName).toContain("Backpack");
    expect(itemCount).toBe(6);
  });

  // LocatorAssertions
  test("Test №3 LocatorAssertions", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");

    const inventoryContainer = page.locator(".inventory_list");
    const addToCartButton = page.locator("#add-to-cart-sauce-labs-backpack");
    const cartBadge = page.locator(".shopping_cart_badge");

    await expect(inventoryContainer).toBeVisible();
    await expect(inventoryContainer).toContainText("Backpack");
    await expect(addToCartButton).toBeEnabled();
    await expect(addToCartButton).toHaveText("Add to cart");
    await expect(page.locator(".inventory_item")).toHaveCount(6);

    await addToCartButton.click();
    await expect(cartBadge).toHaveText("1");
  });
});

test("Test №4 Screenshot ", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await expect(page).toHaveScreenshot("login-page.png");

  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");

  const loginButton = page.locator("#login-button");
  await expect(loginButton).toHaveScreenshot("login-button.png");

  await loginButton.click();
  await expect(page.locator(".inventory_list")).toHaveScreenshot(
    "inventory-list.png",
  );
});

//Включение tracing конкретно для 5 теста
test.use({ trace: "on" });

test("Test №5 Tracing", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");

  await page.click("#add-to-cart-sauce-labs-backpack");

  await page.click(".shopping_cart_link");

  await expect(page.locator(".cart_item")).toHaveCount(1);
  await expect(page.locator(".inventory_item_name")).toHaveText(
    "Sauce Labs Backpack",
  );

  await page.click("#checkout");
  await page.fill("#first-name", "Diana");
  await page.fill("#last-name", "Bych");
  await page.fill("#postal-code", "12345");
  await page.click("#continue");

  await page.click("#finish");
  await expect(page.locator(".complete-header")).toHaveText(
    "Thank you for your order!",
  );
});

// Тест 6: НАМЕРЕННО ЗАФЕЙЛЕННЫЙ тест (нужно будет починить)
test("Test №6 FAILED TEST", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  // Неправильные данные для входа
  await page.fill("#user-name", "wrong_user");
  await page.fill("#password", "wrong_password");
  await page.click("#login-button");

  // ОШИБКА: Ожидали  успешный логин, но он не прошел

//   await expect(page.locator(".inventory_list")).toBeVisible();
// });

 // ИСПРАВЛЕННАЯ ЧАСТЬ ТЕСТА: Теперь ожидаем сообщение об ошибке
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
});

// Кастомный assertion
test("Test №7 Check password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  const password = await page.locator(".login_password").innerText();
  console.log(password);
  expect(password).isValidPassword();
});
//Этот тест упадет, так как пароль не проходит проверку валидности по требованиям, но кастомный assertion используется
