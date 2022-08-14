const { test, expect } = require("@playwright/test");

test.describe("Sorting", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/inventory.html");
  });
  // name (z to a)
  test("should sort products by Name (Z to A)", async ({ page }) => {
    await page.selectOption("data-test=product_sort_container", "za");
    const firstProduct = page.locator(".inventory_item_name").first();
    await expect(firstProduct).toHaveText("Test.allTheThings() T-Shirt (Red)");
    const lastProduct = page.locator(".inventory_item_name").last();
    await expect(lastProduct).toHaveText("Sauce Labs Backpack");
  });
  // name (a to z)
  test("should sort products by Name (A to Z)", async ({ page }) => {
    await page.selectOption("data-test=product_sort_container", "az");
    const firtProduct = page.locator(".inventory_item_name").first();
    await expect(firtProduct).toHaveText("Sauce Labs Backpack");
    const lastProduct = page.locator(".inventory_item_name").last();
    await expect(lastProduct).toHaveText("Test.allTheThings() T-Shirt (Red)");
  });
  // price(low to high)
  test("should sort products by Price (Low to High)", async ({ page }) => {
    await page.selectOption("data-test=product_sort_container", "lohi");
    const firstProduct = page.locator(".inventory_item_price").first();
    await expect(firstProduct).toHaveText("$7.99");
    const lastProduct = page.locator(".inventory_item_price").last();
    await expect(lastProduct).toHaveText("$49.99");
  });
  // price(high to low)
  test("should sort products by Price (High to Low)", async ({ page }) => {
    await page.selectOption("data-test=product_sort_container", "hilo");
    const firstProduct = page.locator(".inventory_item_price").first();
    await expect(firstProduct).toHaveText("$49.99");
    const lastProduct = page.locator(".inventory_item_price").last();
    await expect(lastProduct).toHaveText("$7.99");
  });
});
