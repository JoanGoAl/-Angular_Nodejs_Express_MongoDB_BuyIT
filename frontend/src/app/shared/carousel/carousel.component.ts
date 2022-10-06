import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from 'src/app/core/models';
import { CategoryService } from 'src/app/core/services';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnInit {
  items!: Array<Category>;

  constructor(private test: CategoryService) { }

  ngOnInit(): void {

    this.test.getCategories().subscribe((docs) => {
      this.items = docs
    })
  }

}
