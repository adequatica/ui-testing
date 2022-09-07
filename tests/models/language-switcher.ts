import { Page, Locator } from '@playwright/test';

export class CernLanguageSwitcher {
  private page: Page;
  private lang: Locator;
  private langFr: Locator;

  constructor(page: Page) {
    this.page = page;
    this.lang = page.locator('.cern-menu-lang-switcher');
    this.langFr = page.locator('.fr');
  }

  async switchLang(): Promise<void> {
    await this.lang.click();
    await this.langFr.click();
  }

  public getLang(): Locator {
    return this.lang;
  }
}
