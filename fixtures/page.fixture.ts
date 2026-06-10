
import { test as base } from '@playwright/test';
import { BookStorePage } from '../pages/book-store.page';
import { ProfilePage } from '../pages/profile.page';
import { LoginPage } from '../pages/login.page';

type MyFixtures = {
  bookStorePage: BookStorePage;
  profilePage: ProfilePage;
  loginPage: LoginPage;

};

export const test = base.extend<MyFixtures>({
  bookStorePage: async ({ page }, use, testInfo) => {
    const bookStorePage = new BookStorePage(page);

    await use(bookStorePage);

    // ✅ Auto screenshot khi fail
    if (testInfo.status !== testInfo.expectedStatus) {
      const fileName = `${testInfo.title}-${Date.now()}.png`;

      await page.screenshot({
        path: `__screenshots__/FAIL-${testInfo.title}-${Date.now()}.png`,
        fullPage: true
      });
    }
  },
  
  profilePage: async ({ page }, use) => {
      await use(new ProfilePage(page));
    },

    loginPage: async ({ page }, use) => {
      await use(new LoginPage(page));
    }

});

export { expect } from '@playwright/test';
