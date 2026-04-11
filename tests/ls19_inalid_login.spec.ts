import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();//5...
  await page.locator('[data-test="username"]').press('CapsLock');//... и 6 строка заменяется одной строкой 7, поэтому можем удалять 5,6
  await page.locator('[data-test="username"]').fill('D');
  //await page.locator('[data-test="username"]').press('CapsLock');
  await page.locator('#user-name').fill('Diana');
 // так же можно как 8 и 9 выбирать через page.getBy....
  await page.locator('[data-test="username"]').fill('Diana');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('1234diana');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText('MEGA Epic sadface: Username and password do not match any user in this service');
  expect(1).toEqual(1);
});