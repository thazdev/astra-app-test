import { Page, expect } from "@playwright/test";

// tests/e2e/pages/ContractPage.ts
export class ContractPage {
  constructor(private readonly page: Page) {}

  static async open(page: Page, { clientId }: { clientId: string }) {
    await page.goto(`http://localhost:5173/contracts/${clientId}`);
    await expect(
      page.getByRole("heading", { name: /Contrato/i }),
    ).toBeVisible();
    return new ContractPage(page);
  }

  async scheduleMeeting(isoDateTime: string) {
    await this.page.getByTestId("schedule-meeting").click();
    await this.page.getByTestId("meeting-datetime").fill(isoDateTime);
    await this.page.getByTestId("confirm-meeting").click();
    return this.page.getByText(/Reunião marcada/i);
  }
}
