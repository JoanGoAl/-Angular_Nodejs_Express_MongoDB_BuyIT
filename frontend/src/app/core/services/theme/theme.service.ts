import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) { }

  swithTheme(theme: String) {
    let themeLink = this.document.getElementById('theme') as HTMLLinkElement

    console.log('B');

    if (themeLink) {
      themeLink.href = `${themeLink}.css`
      console.log(themeLink);
    }

  }
}
