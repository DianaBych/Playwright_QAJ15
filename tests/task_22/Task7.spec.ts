import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Task7: Скачать файл и проверить содержимое', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/download');
  
  // Ожидаем скачивание
  const download = await Promise.all([
    page.waitForEvent('download'),
    page.click('text="upload_sample.txt"')
  ]);
  
  // Сохраняем в папку
  const downloadPath = await download[0].path();
  const savedPath = path.join(process.cwd(), 'tests', 'downloaded_sample.txt');
  await download[0].saveAs(savedPath);
  
  // Читаем содержимое
  const content = fs.readFileSync(savedPath, 'utf8');
  const expectedContent = "This file is used by the automated file upload workflow.";
  expect(content.trim()).toBe(expectedContent);
});
