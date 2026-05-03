import { test, expect } from '@playwright/test';

test('Task8: Обработка JS confirm', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  
  // Первый диалог - accept
  page.once('dialog', async dialog => {  // once - сработает ТОЛЬКО ОДИН РАЗ
    expect(dialog.message()).toBe('I am a JS Confirm');
    await dialog.accept();
  });
  
  await page.click('button[onclick="jsConfirm()"]');
  await expect(page.locator('#result')).toHaveText('You clicked: Ok');
  
  // Второй диалог - dismiss
  page.once('dialog', async dialog => { 
    await dialog.dismiss();
  });
  
  await page.click('button[onclick="jsConfirm()"]');
  await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
});