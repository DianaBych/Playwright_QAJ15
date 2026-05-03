import { test, expect } from '@playwright/test';

test('Task4: Перетащить A на B и проверить обмен местами', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
  
  const columnA = page.locator('#column-a');
  const columnB = page.locator('#column-b');
  
  // Получаем исходные тексты
  const initialAText = await columnA.textContent();
  const initialBText = await columnB.textContent();
  
  // Перетаскивание
  await columnA.dragTo(columnB);
  
  // Проверяем, что тексты поменялись
  await expect(columnA).toHaveText(initialBText!);
  await expect(columnB).toHaveText(initialAText!);
});
