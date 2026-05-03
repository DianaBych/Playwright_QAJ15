import { test } from "@playwright/test";
import { saveStandardUserState } from "../global-setup";

test("Настройка: сохранение сессии пользователя standard_user", async () => {
  await saveStandardUserState();
});
