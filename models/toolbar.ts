import { Locator, Page } from '@playwright/test';

export class CernToolbar {
  private page: Page;
  private toolbar: Locator;
  private header: Locator;
  private navbarToggle: Locator;
  private expandedNavbar: Locator;
  private closeButton: Locator;
  private openMenu: Locator;
  private signIn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toolbar = page.locator('#header-sso');
    this.header = page.locator('#header-container');
    this.navbarToggle = page.getByRole('button', { name: 'Toggle Menu' });
    this.expandedNavbar = page.locator('#mega-menu-header-nav');
    this.closeButton = page.getByRole('button', { name: 'Close' });
    this.openMenu = page.locator('[class*=mega-sub-menu]');
    this.signIn = page.getByRole('link', { name: 'Sign In' });
  }

  async getToolbar(): Promise<Locator> {
    return await this.toolbar;
  }

  async getToolbarNavbar(): Promise<Locator> {
    return await this.toolbar.locator('nav');
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
      state: visibleState ? 'visible' : 'hidden',
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
    await this.expandedNavbar.getByRole('button', { name: itemName }).click();
  }

  async getOpenedOverlay(): Promise<Locator> {
    return await this.openMenu.first();
  }

  async closeMenu(): Promise<void> {
    await this.closeButton.click();
  }
}
