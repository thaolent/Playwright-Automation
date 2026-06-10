
import { Page, expect } from '@playwright/test';
import path from 'path';

export class ProfilePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://demoqa.com/profile');
  }

  async verifyBookVisible(bookName: string) {
    await expect(this.page.locator(`text=${bookName}`)).toBeVisible();
  }

  async clickDelete() {
    await this.page.locator('[title="Delete"]').first().click();
  }

  async confirmDelete() {
    await this.page.locator('#closeSmallModal-ok').click();

    // ✅ alert
    /*this.page.once('dialog', async dialog => {
      await dialog.accept();
    });*/
  }

  async verifyBookDeleted(bookName: string) {
    await expect(this.page.locator(`text=${bookName}`)).not.toBeVisible();
  }

  async takeScreenshot(name: string) {
    const filePath = path.join(
      process.cwd(),
      '__screenshots__',
      `${name}-${Date.now()}.png`
    );

    await this.page.screenshot({
      path: filePath,
      fullPage: true
    });
  }
}