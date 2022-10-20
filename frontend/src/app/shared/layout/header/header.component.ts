import { DOCUMENT } from '@angular/common';
import { ThemeService } from './../../../core/services/theme.service';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { Product } from 'src/app/core/models';
import { ProductService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  autocomplete?: string;
  results: String[] = []

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private themeService: ThemeService,
    private productService: ProductService
  ) {}

    search(e: any) {
      this.productService.productStartWith(e.query).subscribe((e) => {
        this.results = e.map((i) => i.name)
      })
    }

  switchTheme() {
    let doc = this.document.getElementById('theme');

    Array.from(this.document.getElementsByTagName('li')).map((item) => {
      if (item.id == 'items-list') item.classList.toggle('dark')
    })

    Array.from(this.document.getElementsByTagName('div')).map((item) => {
      if (item.id == "catWrapper") {
        item.classList.toggle('home-categories-list-content-wrapper')
        item.classList.toggle('home-categories-list-content-wrapper-dark')
      }
    })

    if (doc) {
      doc.classList.toggle('pi-moon');
      doc.classList.toggle('pi-sun');

      this.themeService.switchTheme();
    }
  }

  ngOnInit(): void {

  }
}
