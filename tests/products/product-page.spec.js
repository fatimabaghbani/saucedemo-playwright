const { test, expect } = require("@playwright/test");

test.describe("Product page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/inventory.html");
  });
  // go to product page from list
  test.describe("go to product page from products list", () => {
    test("should open the product page on click item title", async ({
      page,
    }) => {
      await page.locator(".inventory_item_name").first().click();
      await expect(page.url()).toBe(
        "https://www.saucedemo.com/inventory-item.html?id=4"
      );
    });
    test("should open the product page on click item image", async ({
      page,
    }) => {
      await page.locator(".inventory_item_img").nth(6).click();
      await expect(page.url()).toBe(
        "https://www.saucedemo.com/inventory-item.html?id=5"
      );
    });
  });
  // product page elements
  test.describe("product page elements", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/inventory-item.html?id=4");
    });
    // product title
    test("should show product title", async ({ page }) => {
      await expect(page.locator("text=Sauce Labs Backpack")).toBeVisible();
      await expect(page.locator("text=Sauce Labs Backpack")).toHaveClass(
        "inventory_details_name large_size"
      );
    });
    // product image
    test("should show product image", async ({ page }) => {
      await expect(page.locator(".inventory_details_img")).toBeVisible();
      await expect(page.locator(".inventory_details_img")).toHaveAttribute(
        "src",
        "/static/media/sauce-backpack-1200x1500.34e7aa42.jpg"
      );
    });
    // Back to products button
    test("should back to products list on click back button", async ({
      page,
    }) => {
      await expect(page.locator("text=Back to products")).toBeVisible();
      await page.locator("text=Back to products").click();
      await expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");
    });
    // add/remove button
    test("should change buttons status on click Add/remove", async ({
      page,
    }) => {
      await expect(
        page.locator("data-test=add-to-cart-sauce-labs-backpack")
      ).toBeVisible();
      await expect(
        page.locator("data-test=add-to-cart-sauce-labs-backpack")
      ).toBeEnabled();
      await expect(
        page.locator("data-test=add-to-cart-sauce-labs-backpack")
      ).toHaveText("Add to cart");
      await page.locator("data-test=add-to-cart-sauce-labs-backpack").click();
      await expect(
        page.locator("data-test=remove-sauce-labs-backpack")
      ).toBeVisible();
      await expect(
        page.locator("data-test=remove-sauce-labs-backpack")
      ).toHaveText("Remove");
      await expect(
        page.locator("data-test=add-to-cart-sauce-labs-backpack")
      ).not.toBeVisible();
      await page.locator("data-test=remove-sauce-labs-backpack").click();
      await expect(
        page.locator("data-test=add-to-cart-sauce-labs-backpack")
      ).toBeVisible();
      await expect(
        page.locator("data-test=add-to-cart-sauce-labs-backpack")
      ).toHaveText("Add to cart");
      await expect(
        page.locator("data-test=remove-sauce-labs-backpack")
      ).not.toBeVisible();
    });
    // cart indicator
    test("should change cart indicator status on click Add/remove ", async ({
      page,
    }) => {
      await page.locator("data-test=add-to-cart-sauce-labs-backpack").click();
      await expect(page.locator(".shopping_cart_badge")).toBeVisible();
      await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
      await page.locator("data-test=remove-sauce-labs-backpack").click();
      await expect(page.locator(".shopping_cart_badge")).not.toBeVisible();
    });
  });
});
