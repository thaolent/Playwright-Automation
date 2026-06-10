
import { Page, expect } from '@playwright/test';
import path from 'path';

export class BookStorePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  searchInput() {
    return this.page.locator('#searchBox');
  }

  bookTitles() {
    return this.page.locator('.rt-tbody .rt-tr-group .rt-td:nth-child(2)');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/books');
  }

  async search(keyword: string) {
    await this.searchInput().fill(keyword);
  }

  async getBookTitles(): Promise<string[]> {
    return await this.bookTitles().allTextContents();
  }

  async verifyBooksContain(keyword: string) {
    const titles = await this.getBookTitles();

    for (const title of titles) {
      expect(title.toLowerCase()).toContain(keyword.toLowerCase());
    }
  }

  //find bookname to add to collection
  
  async search1(bookName: string) {
    await this.page.locator('#searchBox').fill(bookName);
  }

  
  async clickBook(bookName: string) {

    await this.page.locator(`a:has-text("${bookName}")`).click();
  }

  async addToCollection() {
    
    /*this.page.once('dialog', async dialog => {
      await dialog.accept();
    });*/

    const addBtn = this.page.getByRole('button', {
      name: 'Add To Your Collection'
    });

    await addBtn.scrollIntoViewIfNeeded();
    await addBtn.click({ force: true });

  }

  async takeScreenshot(name: string) {
    const filePath = path.join(process.cwd(), '__screenshots__', `${name}-${Date.now()}.png`);

    await this.page.screenshot({
      path: filePath,
      fullPage: true
    });
  }
}
