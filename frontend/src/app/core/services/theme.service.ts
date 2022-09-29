import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) { }

  swithTheme(theme: String) {
    let lightLink = this.document.getElementById('app-theme-light') as HTMLLinkElement
    let darktLink = this.document.getElementById('app-theme-dark') as HTMLLinkElement

  }
}
