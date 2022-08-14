const { test, expect } = require("@playwright/test");
const { resetAppState } = require("../../helpers/helpers");

test.describe("Products list buttons", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/inventory.html");
  });
  // check add and remove button
  test("should change buttons status on click Add/remove", async ({ page }) => {
    await expect(
      page.locator("data-test=add-to-cart-sauce-labs-onesie")
    ).toBeVisible();
    await expect(
      page.locator("data-test=add-to-cart-sauce-labs-onesie")
    ).toBeEnabled();
    await expect(
      page.locator("data-test=add-to-cart-sauce-labs-onesie")
    ).toHaveText("Add to cart");
    await page.locator("data-test=add-to-cart-sauce-labs-onesie").click();
    await expect(
      page.locator("data-test=remove-sauce-labs-onesie")
    ).toBeVisible();
    await expect(page.locator("data-test=remove-sauce-labs-onesie")).toHaveText(
      "Remove"
    );
    await expect(
      page.locator("data-test=remove-sauce-labs-onesie")
    ).toBeEnabled();
    await expect(
      page.locator("data-test=add-to-cart-sauce-labs-onesie")
    ).not.toBeVisible();
    await page.locator("data-test=remove-sauce-labs-onesie").click();
    await expect(
      page.locator("data-test=add-to-cart-sauce-labs-onesie")
    ).toBeVisible();
    await expect(
      page.locator("data-test=add-to-cart-sauce-labs-onesie")
    ).toHaveText("Add to cart");
    await expect(
      page.locator("data-test=add-to-cart-sauce-labs-onesie")
    ).toBeEnabled();
    await expect(
      page.locator("data-test=remove-sauce-labs-onesie")
    ).not.toBeVisible();
  });
  // add and remove items
  test("should change cart indicator status on click Add/remove", async ({
    page,
  }) => {
    await page.locator("data-test=add-to-cart-sauce-labs-backpack").click();
    await expect(page.locator(".shopping_cart_badge")).toBeVisible();
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
    await page.locator("data-test=add-to-cart-sauce-labs-bike-light").click();
    await page
      .locator("data-test=add-to-cart-sauce-labs-fleece-jacket")
      .click();
    await expect(page.locator(".shopping_cart_badge")).toHaveText("3");
    await page.locator("data-test=remove-sauce-labs-bike-light").click();
    await expect(page.locator(".shopping_cart_badge")).toHaveText("2");
    await page.locator("data-test=add-to-cart-sauce-labs-bolt-t-shirt").click();
    await page
      .locator("data-test=add-to-cart-test.allthethings()-t-shirt-(red)")
      .click();
    await expect(page.locator(".shopping_cart_badge")).toHaveText("4");
    await resetAppState(page);
  });
});
