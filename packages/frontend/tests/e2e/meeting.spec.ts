import { expect, test } from "@playwright/test";
import { loginAs } from "../support/authn";
import { ContractPage } from "./pages/ContractPage";

test("consultor agenda reunião pelo contrato", async ({ page }) => {
  await loginAs(page, "CONSULTOR");

  const contract = await ContractPage.open(page, { clientId: "123" });

  const dateLocator = await contract.scheduleMeeting("2025-07-21T10:00");

  await expect(dateLocator).toContainText("21/07/2025 10:00");
});
