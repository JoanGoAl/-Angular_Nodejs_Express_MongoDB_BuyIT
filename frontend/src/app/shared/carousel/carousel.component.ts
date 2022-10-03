import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from 'src/app/core/models';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnInit {
  @Input('toDisplay') items!: Array<Category>;

  constructor() { }

  ngOnInit(): void {
  }

}
