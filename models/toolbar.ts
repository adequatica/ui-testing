import { Locator, Page } from '@playwright/test';

export class CernToolbar {
  private page: Page;
  private toolbar: Locator;
  private header: Locator;
  private navbarToggle: Locator;
  private expandedNavbar: Locator;
  private dropdownNavbar: Locator;
  private openMenu: Locator;
  private signIn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toolbar = page.locator('#cern-toolbar');
    this.header = page.locator('header');
    this.navbarToggle = page.locator('button.navbar-toggle');
    this.expandedNavbar = page.locator('.navbar-collapse.collapse.in');
    this.dropdownNavbar = page.locator('.dropdown-toggle');
    this.openMenu = page.locator('[class*=open-cern-menu]');
    this.signIn = page.locator('[class*=cern-signin]');
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
    await this.navbarToggle.click();
  }

  async clickOnSignIn(): Promise<void> {
    await this.signIn.click();
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

  async clickOnMenuItem(itemName: string): Promise<void> {
    await this.dropdownNavbar.getByText(itemName).click();
  }

  async getOpenedOverlay(): Promise<Locator> {
    return await this.openMenu.first();
  }
}
