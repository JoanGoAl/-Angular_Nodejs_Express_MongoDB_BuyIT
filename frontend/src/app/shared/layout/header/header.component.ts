import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MegaMenuItem, MenuItem, PrimeIcons } from 'primeng/api'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  hidden: boolean = true
  items!: MegaMenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Categorias',
        items: [
          [
            { label: "Moda y Accesorios" },
            { label: "Deporte y Ocio" },
            { label: "Electrónica" },
            { label: 'Motor' }
          ]
        ]
      }
    ]
  }

}
