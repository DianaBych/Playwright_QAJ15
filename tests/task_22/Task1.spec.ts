import { test, expect } from "@playwright/test";

test("Task1: Проверка текста на странице поиска книг", async ({ page }) => {
  await page.goto("https://books-pwakit.appspot.com/");
  const expectedText =
    "Search the world's most comprehensive index of full-text books.";
  const textLocator = page.locator(".books-desc");
  await expect(textLocator).toHaveText(expectedText);
});
