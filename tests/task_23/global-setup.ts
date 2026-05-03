import { chromium, type FullConfig } from "@playwright/test";
import path from 'path';

export const STANDARD_USER_STATE_PATH = path.resolve(
  process.cwd(),
  "task_23",
  "standard-user-state.json",
);

export async function saveStandardUserState() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage(); 

  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.locator('#login-button').click();

  await page.waitForURL("**/inventory.html");

  await context.storageState({ path: STANDARD_USER_STATE_PATH });
  await browser.close();
}

export default async function globalSetup(_config: FullConfig) {
  await saveStandardUserState();
}

