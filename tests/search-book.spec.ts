
import { test, expect } from '../fixtures/page.fixture';
import data from '../data/frontend/search-data.json';

test.describe('Search Book', () => {

  test('Search book with "Design"', async ({ bookStorePage }) => {

    await bookStorePage.goto();

    await bookStorePage.search(data.keyword1);

    // ✅ Screenshot 1
    await bookStorePage.takeScreenshot('search-Design');

    await bookStorePage.verifyBooksContain(data.keyword1);
  });

  test('Search book with "design" (case insensitive)', async ({ bookStorePage }) => {

    await bookStorePage.goto();

    await bookStorePage.search(data.keyword2);

    // ✅ Screenshot 2
    await bookStorePage.takeScreenshot('search-design');

    await bookStorePage.verifyBooksContain(data.keyword2);
  });

});
