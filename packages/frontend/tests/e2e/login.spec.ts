import { expect, test } from "@playwright/test";

test("fluxo de cadastro", async ({ page }) => {
  const uniqueEmail = `test-${Date.now()}@example.dev`;

  await page.goto("http://localhost:5173/register");
  await page.getByPlaceholder("Nome").fill("lorenzo");
  await page.getByPlaceholder("Email").fill(uniqueEmail);
  await page.getByPlaceholder("Senha").fill("123456");
  await page.getByRole("button", { name: "Cadastrar" }).click();

  await expect(page.getByTestId("success")).toBeVisible({ timeout: 5000 });
});
