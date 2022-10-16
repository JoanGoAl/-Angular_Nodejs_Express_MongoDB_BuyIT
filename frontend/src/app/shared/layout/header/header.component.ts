import { DOCUMENT } from '@angular/common';
import { ThemeService } from './../../../core/services/theme.service';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  hidden: boolean = true;
  items!: MegaMenuItem[];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private themeService: ThemeService
  ) {}

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
    this.items = [
      {
        label: 'Categorias',
        items: [
          [
            { label: 'Moda y Accesorios' },
            { label: 'Deporte y Ocio' },
            { label: 'Electrónica' },
            { label: 'Motor' },
          ],
        ],
      },
    ];
  }
}
