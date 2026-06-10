

import { test, expect } from '../fixtures/page.fixture';
import { Dialog } from '@playwright/test';
import data from '../data/frontend/search-data.json';

test('Delete book successfully', async ({
  page,           
  loginPage,
  bookStorePage,
  profilePage
}) => {

  // ✅ STEP 1: LOGIN
  await loginPage.goto();
  await loginPage.login(data.username, data.password);

  //verify login success by checking username visible
  await expect(page.locator('text=thaolent')).toBeVisible();

  // ✅ STEP 2: Go to Book Store
  await bookStorePage.goto();

  // ✅ STEP 3: Search
  await bookStorePage.search(data.bookName);

  // ✅ STEP 4: Click book
  await bookStorePage.clickBook(data.bookName);

  // ✅ STEP 5: Add
  
    //handle alert add book to collection
    page.once('dialog', async (dialog) => {
    console.log('ADD DIALOG:', dialog.message());
    await dialog.accept();
    });

  await bookStorePage.addToCollection();

  //take screenshot after add book to collection
  await bookStorePage.takeScreenshot('after-add-book');

  await page.waitForTimeout(1000);

  // ✅ STEP 6: Go to profile
  await profilePage.goto();

  await profilePage.verifyBookVisible(data.bookName);

  //take screenshot before delete book
  await profilePage.takeScreenshot('before-delete-book');

  // ✅ STEP 7: Delete

  await profilePage.clickDelete();

  // ✅ handle alert
  /*page.once('dialog', async (dialog: Dialog) => {
    await dialog.accept();
  });*/
  
    page.once('dialog', async (dialog) => {
    console.log('✅ Dialog message:', dialog.message());
    await dialog.accept();
    });

  // ✅ click OK trên modal
  await profilePage.confirmDelete();

  // ✅ STEP 8: Verify delete
  await profilePage.verifyBookDeleted(data.bookName);

  //take screenshot after delete book
  await profilePage.takeScreenshot('after-delete-success');
});
