import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem, PrimeIcons } from 'primeng/api'
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items!: MegaMenuItem[];

  constructor(private themeService: ThemeService) { }

  cgTheme() {
    this.themeService.swithTheme('darkTheme')
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Inicio',
        icon: PrimeIcons.HOME,
        styleClass: 'nav-items',
      },
      {
        label: 'Tienda',
        styleClass: 'nav-items',
        items: [
          [
            {
              label: 'Categorias',
              items: [
                { label: 'Ropa' },
                { label: 'Coches' },
                { label: 'Muebles' }
              ]
            },
            {
              label: 'Lo más buscado'
            }
          ]
        ]
      }
    ]
  }

}
