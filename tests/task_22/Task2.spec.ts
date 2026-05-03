import { test, expect } from '@playwright/test';

test('Task2: Открыть новую страницу и проверить URL и title', async ({ page, context }) => {
  await page.goto('https://the-internet.herokuapp.com/windows');
  
  //Клик по ссылке, которая открывает новое окно
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('text="Click Here"')
  ]);

  // Дождаться загрузки новой страницы
  await newPage.waitForLoadState();
  
  // Проверки
  expect(newPage.url()).toBe('https://the-internet.herokuapp.com/windows/new');
  await expect(newPage).toHaveTitle('New Window');
});
