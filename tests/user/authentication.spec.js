// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("Authentication", () => {
  // standard user
  test.describe("Standard User", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/inventory.html");
    });
    // is already logged in via global-setup.js
    test("should be logged in with the standard user credentials", async ({
      page,
    }) => {
      await expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");
    });
    // logout
    test("should logout", async ({ page }) => {
      await page.locator(".bm-burger-button").click();
      await page.locator("#logout_sidebar_link").click();
      await expect(page.url()).toBe("https://www.saucedemo.com/");
    });
    // check not authenticate products list page
    test("should not be able to access products list page if not authenticated", async ({
      page,
    }) => {
      await page.locator(".bm-burger-button").click();
      await page.locator("#logout_sidebar_link").click();
      await page.goto("/inventory.html");
      await expect(
        page.locator(".error-message-container.error")
      ).toBeVisible();
      await expect(page.locator(".error-message-container.error")).toHaveText(
        "Epic sadface: You can only access '/inventory.html' when you are logged in."
      );
      await expect(page.locator("data-test=username")).toHaveClass(/error/);
      await expect(page.locator("data-test=password")).toHaveClass(/error/);
    });
    // error button functionality
    test("should close error message on click on error button", async ({
      page,
    }) => {
      await page.locator(".bm-burger-button").click();
      await page.locator("#logout_sidebar_link").click();
      await page.goto("/inventory.html");
      await expect(
        page.locator(".error-message-container.error")
      ).toBeVisible();
      await page.locator(".error-button").click();
      await expect(
        page.locator(".error-message-container.error")
      ).not.toBeVisible();
    });
  });
  // Locked Out User
  test.describe("Locked Out User", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      await page.locator("data-test=username").fill("locked_out_user");
      await page.locator("data-test=password").fill("secret_sauce");
      await page.locator("data-test=login-button").click();
    });
    // should not be able to login
    test("should not login with the locked out user credentials", async ({
      page,
    }) => {
      await expect(page.url()).toBe("https://www.saucedemo.com/");
    });
    // should show error
    test("should show error when try to login with locked out user credentials", async ({
      page,
    }) => {
      await expect(page.locator(".error-message-container")).toBeVisible();
      await expect(
        page.locator("text=Epic sadface: Sorry, this user has been locked out.")
      ).toBeVisible();
      await expect(page.locator("data-test=username")).toHaveClass(/error/);
      await expect(page.locator("data-test=password")).toHaveClass(/error/);
    });
  });
});
