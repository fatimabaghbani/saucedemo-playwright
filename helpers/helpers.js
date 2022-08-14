export async function resetAppState(page) {
  await page.locator('text=Open Menu').click();
  await page.locator('text=Reset App State').click();
  await page.locator('text=Close Menu').click();
}
