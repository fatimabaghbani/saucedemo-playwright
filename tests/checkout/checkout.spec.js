const { test, expect } = require("@playwright/test");
const { resetAppState } = require("../../helpers/helpers");

test.describe("Checkout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/inventory.html");
    await page.locator("data-test=add-to-cart-sauce-labs-backpack").click();
    await page.locator(".shopping_cart_link").click();
  });
  test.afterEach(async ({ page }) => {
    await resetAppState(page);
  });
  // check out button
  test("should go to step one of checkout on click on check out button", async ({
    page,
  }) => {
    await expect(page.locator("data-test=checkout")).toBeVisible();
    await expect(page.locator("data-test=checkout")).toHaveText("Checkout");
    await page.locator("data-test=checkout").click();
    await expect(page.url()).toBe(
      "https://www.saucedemo.com/checkout-step-one.html"
    );
  });
  // Step one
  test.describe("Step one", () => {
    test.beforeEach(async ({ page }) => {
      await page.locator("data-test=checkout").click();
    });
    // information form
    test("should show inforamtion form and Continue button ", async ({
      page,
    }) => {
      await expect(page.locator(".checkout_info")).toBeVisible();
      await expect(page.locator("data-test=continue")).toBeVisible();
      await expect(page.locator("data-test=continue")).toBeEnabled();
      await expect(page.locator("data-test=continue")).toHaveAttribute(
        "value",
        "Continue"
      );
    });
    // cancel step one
    test("should go back to cart page on click cancel on step one", async ({
      page,
    }) => {
      await expect(page.locator("data-test=cancel")).toBeVisible();
      await expect(page.locator("data-test=cancel")).toBeEnabled();
      await expect(page.locator("data-test=cancel")).toHaveText("Cancel");
      await page.locator("data-test=cancel").click();
      await expect(page.url()).toBe("https://www.saucedemo.com/cart.html");
    });
    // validate the information form on step one
    test("should validate the information form on step one", async ({
      page,
    }) => {
      // first name
      await page.locator("data-test=firstName").fill("");
      await page.locator("data-test=lastName").fill("Baghbani");
      await page.locator("data-test=postalCode").fill("2071VL");
      await page.locator("data-test=continue").click();
      await expect(page.url()).toBe(
        "https://www.saucedemo.com/checkout-step-one.html"
      );
      await expect(
        page.locator(".error-message-container.error")
      ).toBeVisible();
      await expect(page.locator(".error-message-container.error")).toHaveText(
        "Error: First Name is required"
      );
      await expect(page.locator("data-test=firstName")).toHaveClass(/error/);
      // last name
      await page.locator("data-test=firstName").fill("Fatemeh");
      await page.locator("data-test=lastName").fill("");
      await page.locator("data-test=continue").click();
      await expect(page.url()).toBe(
        "https://www.saucedemo.com/checkout-step-one.html"
      );
      await expect(
        page.locator(".error-message-container.error")
      ).toBeVisible();
      await expect(page.locator(".error-message-container.error")).toHaveText(
        "Error: Last Name is required"
      );
      await expect(page.locator("data-test=lastName")).toHaveClass(/error/);
      // zip/postal code
      await page.locator("data-test=lastName").fill("Baghbani");
      await page.locator("data-test=postalCode").fill("");
      await page.locator("data-test=continue").click();
      await expect(page.url()).toBe(
        "https://www.saucedemo.com/checkout-step-one.html"
      );
      await expect(
        page.locator(".error-message-container.error")
      ).toBeVisible();
      await expect(page.locator(".error-message-container.error")).toHaveText(
        "Error: Postal Code is required"
      );
      await expect(page.locator("data-test=postalCode")).toHaveClass(/error/);
    });
    // error button functionality
    test("should close error message on click on error button", async ({
      page,
    }) => {
      await page.locator("data-test=continue").click();
      await expect(page.url()).toBe(
        "https://www.saucedemo.com/checkout-step-one.html"
      );
      await expect(
        page.locator(".error-message-container.error")
      ).toBeVisible();
      await page.locator(".error-button").click();
      await expect(
        page.locator(".error-message-container.error")
      ).not.toBeVisible();
    });
    // Step Two
    test.describe("Step Two", () => {
      test.beforeEach(async ({ page }) => {
        await page.locator("data-test=firstName").fill("Fateme");
        await page.locator("data-test=lastName").fill("Baghbani");
        await page.locator("data-test=postalCode").fill("2071VL");
        await page.locator("data-test=continue").click();
      });
      // click on Continue button and go to checkout overview
      test("should go to checkout overview on click on continue on step one ", async ({
        page,
      }) => {
        await expect(page.url()).toBe(
          "https://www.saucedemo.com/checkout-step-two.html"
        );
      });
      // step two element
      test("should show all info on step two page", async ({ page }) => {
        await expect(page.url()).toBe(
          "https://www.saucedemo.com/checkout-step-two.html"
        );
        await expect(page.locator(".inventory_item_name")).toHaveText(
          "Sauce Labs Backpack"
        );
        await expect(page.locator(".inventory_item_price")).toHaveText(
          "$29.99"
        );
        await expect(page.locator("text=Payment Information:")).toBeVisible();
        await expect(page.locator("text=SauceCard #31337")).toBeVisible();
        await expect(page.locator("text=Shipping Information:")).toBeVisible();
        await expect(
          page.locator("text=FREE PONY EXPRESS DELIVERY!")
        ).toBeVisible();
        await expect(page.locator(".summary_subtotal_label")).toHaveText(
          "Item total: $29.99"
        );
        await expect(page.locator(".summary_tax_label")).toHaveText(
          "Tax: $2.40"
        );
        await expect(page.locator(".summary_total_label")).toHaveText(
          "Total: $32.39"
        );
        // cancel button
        await expect(page.locator("data-test=cancel")).toHaveText("Cancel");
        await expect(page.locator("data-test=cancel")).toBeEnabled();
        await expect(page.locator("data-test=cancel")).toBeVisible();

        // finish button
        await expect(page.locator("data-test=finish")).toHaveText("Finish");
        await expect(page.locator("data-test=finish")).toBeEnabled();
        await expect(page.locator("data-test=finish")).toBeVisible();
      });
      // cancel step two
      test("should go back to products page on click on cancel on step two", async ({
        page,
      }) => {
        await page.locator("data-test=cancel").click();
        await expect(page.url()).toBe(
          "https://www.saucedemo.com/inventory.html"
        );
      });
      // finish checkout
      test("should finish checkout", async ({ page }) => {
        await page.locator("data-test=finish").click();
        await expect(page.url()).toBe(
          "https://www.saucedemo.com/checkout-complete.html"
        );
        await expect(page.locator(".complete-header")).toHaveText(
          "THANK YOU FOR YOUR ORDER"
        );
        await expect(page.locator(".complete-text")).toHaveText(
          "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
        );
        await expect(page.locator(".pony_express")).toHaveAttribute(
          "src",
          "/static/media/pony-express.46394a5d.png"
        );

        await expect(page.locator("data-test=back-to-products")).toHaveText(
          "Back Home"
        );
        await expect(page.locator("data-test=back-to-products")).toBeVisible();
        await expect(page.locator("data-test=back-to-products")).toBeEnabled();
      });
      // back to home from finish page
      test("should go back to products page on click on back home button on finish page", async ({
        page,
      }) => {
        await page.locator("data-test=finish").click();
        await page.locator("data-test=back-to-products").click();
        await expect(page.url()).toBe(
          "https://www.saucedemo.com/inventory.html"
        );
        await expect(page.locator(".shopping_cart_badge")).not.toBeVisible();
        await expect(
          page.locator("data-test=add-to-cart-sauce-labs-backpack")
        ).toBeVisible();
      });
    });
  });
});
