// tests/support/authn.ts
import { Page, expect } from "@playwright/test";

export async function loginAs(page: Page, role: "CONSULTOR") {
  await page.goto("http://localhost:5173/register");

  await page.getByPlaceholder("Nome").fill("consultor");
  await page.getByPlaceholder("Email").fill("consultor@testandotrembbbb.com");
  await page.getByPlaceholder("Senha").fill("123456");
  await page.getByRole("button", { name: "Cadastrar" }).click();

  await expect(page.getByText(/cadastrado com sucesso/i)).toBeVisible({
    timeout: 5_000,
  });
}
