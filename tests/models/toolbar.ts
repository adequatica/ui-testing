import { Page, Locator } from '@playwright/test';

export class CernToolbar {
  private page: Page;
  private toolbar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toolbar = page.locator('#cern-toolbar');
  }

  async getToolbarVisibility(): Promise<boolean> {
    const toolbarVisibility = await this.toolbar.isVisible();

    return toolbarVisibility;
  }

  public getToolbarH1(): Locator {
    return this.toolbar.locator('h1');
  }
}
