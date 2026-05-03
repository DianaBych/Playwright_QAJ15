import { test, expect } from './fixtures/hw23.fixtures';

// Пропущенный тест 
test.skip("Тест на открытие корзины товаров(временно отключен(skip))", async ({ standardPage }) => {
  await standardPage.goto("https://www.saucedemo.com/inventory.html");
});

//Тест с @standard
test("@standard: Тест - пустая корзина у нашего юзера", async ({ standardPage }) => {
  await expect(standardPage.locator(".shopping_cart_badge")).toHaveCount(0);
});

// Параметризованный тест 
test.describe("Параметризованный тест", () => {
  const paths = [
    "https://www.saucedemo.com/inventory.html", 
    "https://www.saucedemo.com/cart.html", 
    "https://www.saucedemo.com/inventory-item.html?id=4"
  ];

  for (const p of paths) {
    test(`Открытие ${p} и проверка отображения лого`, async ({ standardPage }) => {
      await standardPage.goto(p);
      await expect(standardPage.locator(".app_logo")).toBeVisible();
    });
  }
});