import { expect, test } from "./fixtures/hw23.fixtures";

test("Тест должен скриншотом проверять весь хедер (для стандартного юзера)", async ({ standardPage }) => {
  const header = standardPage.locator(".header_container");
  await expect(header).toBeVisible();
  await expect(header).toHaveScreenshot("standard-user-header.png");
});

test("Тест должен проверять количество товаров в корзине при заходе на страницу инвантаря (для второй фикстуры)", async ({
  standardPageWithTwoItems,
}) => {
  await standardPageWithTwoItems.goto("https://www.saucedemo.com/inventory.html");
  await expect(standardPageWithTwoItems.locator(".shopping_cart_badge")).toHaveText(
    "2",
  );
});

test("Тест должен проверять сразу наличие этих товаров, а потом что именно эти товары добавлены в корзину", async ({
  standardPage,
  standardPageWithTwoItems,
}) => {
  await standardPage.goto("https://www.saucedemo.com/inventory.html");
  const firstTwo = standardPage.locator(".inventory_item").nth(0);
  const secondTwo = standardPage.locator(".inventory_item").nth(1);

  const item1Name = await firstTwo.locator(".inventory_item_name").innerText();
  const item1Price = await firstTwo.locator(".inventory_item_price").innerText();
  const item2Name = await secondTwo.locator(".inventory_item_name").innerText();
  const item2Price = await secondTwo.locator(".inventory_item_price").innerText();

  await standardPageWithTwoItems.goto("https://www.saucedemo.com/cart.html");
  const cartItems = standardPageWithTwoItems.locator(".cart_item");
  await expect(cartItems).toHaveCount(2);

  const cartText = await standardPageWithTwoItems
    .locator(".cart_list")
    .innerText();

  expect(cartText).toContain(item1Name);
  expect(cartText).toContain(item2Name);
  expect(cartText).toContain(item1Price);
  expect(cartText).toContain(item2Price);
});

