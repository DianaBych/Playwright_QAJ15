import { test, expect } from '@playwright/test';

test('Task9: Получить title через page.evaluate()', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/tables');
  
  const titleFromEval = await page.evaluate(() => document.title);
  expect(titleFromEval).toBe('The Internet');
  
  // Дополнительно проверим обычным способом
  await expect(page).toHaveTitle('The Internet');
});