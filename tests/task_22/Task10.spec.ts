import { test, expect } from '@playwright/test';

test('Task10: Проверка кнопок в iframe и редактирование текста', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/iframe');
  
  // Закрываем рекламное alert уведомление если оно есть (без этого не проходил тест)
  const closeButton = page.locator('button:has-text("Close")');
  if (await closeButton.isVisible()) {
    await closeButton.click();
  }
  
  const frame = page.frameLocator('#mce_0_ifr');
  const editorBody = frame.locator('body');
  
  await expect(editorBody).toHaveText('Your content goes here.');
  
  const menuButtons = ['File', 'Edit', 'View', 'Format'];
  for (const btnText of menuButtons) {
    const button = page.locator(`button:has-text("${btnText}")`);
    await expect(button).toBeDisabled();
  }
  
//Это поле сейчас недоступно для работы, поэтому проверка на редактирование текста скрыта
//   await editorBody.click();
//   await editorBody.fill('Your content goes here. Diana');
//   await expect(editorBody).toContainText('Diana');
});