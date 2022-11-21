import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeLink!: HTMLLinkElement;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.themeLink = this.document.getElementById('app-theme') as HTMLLinkElement
  }

  switchTheme() {
    let theme = this.themeLink.href.includes('light_theme')
      ? 'dark_theme'
      : 'light_theme';

    if (this.themeLink) {
      this.themeLink.href = `${theme}.css`;
    }
  }

  getTheme() {
    return this.themeLink.href
  }
}
