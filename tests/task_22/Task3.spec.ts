import { test, expect } from '@playwright/test';

test('Task3: Навести на картинку, проверить появление текста', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/hovers');
  
  // Берём первую картинку
  const avatar = page.locator('.figure').first();
  await avatar.hover();
  
  // Проверяем, что появился текст "name: user1"
  const caption = avatar.locator('.figcaption');
  await expect(caption).toBeVisible();
  await expect(caption).toContainText('name: user1');
});
