const { test, expect } = require('@playwright/test');

// MISSION 3 — Add two realistic tests:
// (a) invalid email gives visible error without a POST to /api/reservations
// (b) a successful reservation; intercept/mock POST /api/reservations and assert
//     the JSON request payload and success message.

test('invalid email blocks reservation', async ({ page }) => {
  let reservationPosts = 0;
  page.on('request', request => {
    if (request.method() === 'POST' && request.url().endsWith('/api/reservations')) reservationPosts++;
  });

  await page.goto('/');
  await page.getByRole('button', { name: 'Reserve at Central Square' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('not-an-email');
  await page.getByRole('button', { name: 'Confirm reservation' }).click();

  await expect(page.getByText('Enter a valid email address.')).toBeVisible();
  expect(reservationPosts).toBe(0);
});

test.skip('reservation sends correct payload and confirms booking', async ({ page }) => {
  // TODO
});
