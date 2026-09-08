import { expect, test } from "@playwright/test";

test("shrinkage percentage calculator computes % from wet and fired sizes", async ({ page }) => {
  await page.goto("/shrinkage-percentage");
  await page.getByLabel("Wet, freshly-formed size").fill("10");
  await page.getByLabel("Fired size").fill("8.8");
  await expect(page.getByTestId("result")).toContainText("12%");
});

test("predict fired size calculator computes fired size from wet size and shrinkage", async ({ page }) => {
  await page.goto("/predict-fired-size");
  await page.getByLabel("Wet, freshly-formed size").fill("10");
  await page.getByLabel("Known shrinkage percent").fill("12");
  await expect(page.getByTestId("result")).toContainText("8.8");
});

test("target wet size calculator computes wet size from a target fired size", async ({ page }) => {
  await page.goto("/target-wet-size");
  await page.getByLabel("Target fired size").fill("8.8");
  await page.getByLabel("Known shrinkage percent").fill("12");
  await expect(page.getByTestId("result")).toContainText("10");
});

test("clay shrinkage reference page lists earthenware, stoneware, and porcelain", async ({ page }) => {
  await page.goto("/clay-shrinkage-reference");
  await expect(page.getByRole("cell", { name: "Earthenware", exact: true })).toBeVisible();
  await expect(page.getByRole("cell", { name: /Stoneware/ })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Porcelain", exact: true })).toBeVisible();
});

test("homepage links reach every tool", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Shrinkage percentage calculator" }).click();
  await expect(page).toHaveURL(/\/shrinkage-percentage$/);
});
