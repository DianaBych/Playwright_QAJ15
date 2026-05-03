import { test, expect } from '@playwright/test';

test('Task5: Проверка нажатия Control и ввод последней буквы имени', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/key_presses');
  
  await page.keyboard.down('Control');
  await page.keyboard.up('Control');
  
  // Проверяем, что отобразилось "You entered: CONTROL"
  const result = page.locator('#result');
  await expect(result).toHaveText('You entered: CONTROL');
  
  // Отображение последней буквы моего имени 
  await page.keyboard.type('Diana');
await expect(result).toHaveText('You entered: A');
});
