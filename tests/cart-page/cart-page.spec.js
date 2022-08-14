const { test, expect } = require("@playwright/test");
const { resetAppState } = require("../../helpers/helpers");

test.describe("Cart page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/inventory.html");
  });
  // check url shopping cart
  test("should go to cart page when click on shopping cart link", async ({
    page,
  }) => {
    await page.locator(".shopping_cart_link").click();
    await expect(page.url()).toBe("https://www.saucedemo.com/cart.html");
  });
  // check added product items in shopping cart
  test("should show added products in shopping cart ", async ({ page }) => {
    await page.locator("data-test=add-to-cart-sauce-labs-backpack").click();
    await page.locator("data-test=add-to-cart-sauce-labs-bike-light").click();
    await page.locator(".shopping_cart_link").click();
    await expect(page.locator("text=Sauce Labs Backpack")).toBeVisible();
    await expect(page.locator("text= Sauce Labs Bike Light")).toBeVisible();
    await resetAppState(page);
  });
  // check remove button
  test("should be able to remove added products in shopping cart ", async ({
    page,
  }) => {
    await page.locator("data-test=add-to-cart-sauce-labs-backpack").click();
    await page.locator(".shopping_cart_link").click();
    await expect(
      page.locator("data-test=remove-sauce-labs-backpack")
    ).toBeVisible();
    await expect(
      page.locator("data-test=remove-sauce-labs-backpack")
    ).toHaveText("Remove");
    await page.locator("data-test=remove-sauce-labs-backpack").click();
    await expect(
      page.locator("data-test=remove-sauce-labs-backpack")
    ).not.toBeVisible();
    await expect(page.locator("text=Sauce Labs Backpack")).not.toBeVisible();
  });
  // check continue shopping button
  test("should show/work continue shopping button", async ({ page }) => {
    await page.locator(".shopping_cart_link").click();
    await expect(page.locator("data-test=continue-shopping")).toBeVisible();
    await expect(page.locator("data-test=continue-shopping")).toBeEnabled();
    await expect(page.locator("data-test=continue-shopping")).toHaveText(
      "Continue Shopping"
    );
    await page.locator("data-test=continue-shopping").click();
    await expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");
  });
  // show added products on cart after going back to products page
  test("should show added products on cart after going back to products page", async ({
    page,
  }) => {
    await page.locator("data-test=add-to-cart-sauce-labs-backpack").click();
    await page.locator(".shopping_cart_link").click();
    await page.locator("data-test=continue-shopping").click();
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
    await resetAppState(page);
  });
});
