import { Locator, Page } from '@playwright/test';

export class CernToolbar {
  private page: Page;
  private toolbar: Locator;
  private header: Locator;
  private toggle: Locator;
  private expandedNavbar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toolbar = page.locator('#cern-toolbar');
    this.header = page.locator('header');
    this.toggle = page.locator('button.navbar-toggle');
    this.expandedNavbar = page.locator('.navbar-collapse.collapse.in');
  }

  async getToolbar(): Promise<Locator> {
    return await this.toolbar;
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

  async waitForVisibleText(text: string, visibleState: boolean): Promise<void> {
    // Wait for state https://playwright.dev/docs/api/class-locator#locator-wait-for
    await this.page.getByText(text).waitFor({
      state: visibleState ? 'visible' : 'hidden',
    });
  }

  async focusAfterTab(): Promise<string | null> {
    await this.page.keyboard.press('Tab');
    const focus = await this.page.evaluate(() => {
      const selector = document.activeElement;
      return selector ? selector.innerHTML : null;
    });
    return focus;
  }
}
