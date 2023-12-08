import { Locator, Page } from '@playwright/test';

export class CernToolbar {
  private toolbar: Locator;
  private header: Locator;
  private toggle: Locator;
  private expandedNavbar: Locator;

  constructor(page: Page) {
    this.toolbar = page.locator('#cern-toolbar');
    this.header = page.locator('header');
    this.toggle = page.locator('button.navbar-toggle');
    this.expandedNavbar = page.locator('.navbar-collapse.collapse.in');
  }

  async waitForToolbarVisibility(): Promise<void> {
    await this.toolbar.waitFor({ state: 'visible' });
  }

  async getToolbarH1(): Promise<Locator> {
    return await this.toolbar.locator('h1');
  }

  async getToolbarHeader(): Promise<Locator> {
    return await this.header;
  }

  async clickOnToggle(): Promise<void> {
    await this.toggle.click();
  }

  async waitForExpandedNavbar(visibleState: boolean): Promise<void> {
    // Wait for state https://playwright.dev/docs/api/class-locator#locator-wait-for
    await this.expandedNavbar.waitFor({
      state: visibleState ? 'visible' : 'detached',
    });
  }
}
