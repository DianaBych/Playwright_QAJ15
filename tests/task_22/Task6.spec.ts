import { test, expect } from '@playwright/test';
import path from 'path';

test('Task6: Загрузить файл test.txt', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload');
  
  const filePath = path.join(process.cwd(), 'tests', 'task_22', 'test.txt');
  await page.locator('#file-upload').setInputFiles(filePath);
  await page.locator('#file-submit').click();
  
  // Проверяем успешную загрузку
  await expect(page.locator('.example h3')).toHaveText('File Uploaded!');
  await expect(page.locator('#uploaded-files')).toContainText('test.txt');
});
