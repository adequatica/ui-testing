import { Locator, Page } from '@playwright/test';

export class CernLanguageSwitcher {
  private lang: Locator;
  private langEn: Locator;
  private langFr: Locator;

  constructor(page: Page) {
    this.lang = page.locator('.cern-menu-lang-switcher');
    this.langEn = page.locator('.en');
    this.langFr = page.locator('.fr');
  }

  async switchLang(language: 'english' | 'french'): Promise<void> {
    await this.lang.click();

    switch (language) {
      case 'english':
        await this.langEn.click();

        break;
      case 'french':
        await this.langFr.click();

        break;
    }
  }

  async getLang(): Promise<Locator> {
    return await this.lang;
  }
}
