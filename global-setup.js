const { chromium } = require("@playwright/test");

module.exports = async (config) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  // login
  await page.goto("https://www.saucedemo.com/");
  await page.locator("data-test=username").fill("standard_user");
  await page.locator("data-test=password").fill("secret_sauce");
  await page.locator("data-test=login-button").click();
  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: "storageState.json" });
  await browser.close();
};
