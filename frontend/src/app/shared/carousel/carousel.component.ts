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
<<<<<<< HEAD
    console.log(this.items)
=======

    this.test.getCategories().subscribe((docs) => {
      this.items = docs
    })
>>>>>>> e852b8a3f535158730c7ec0102b3627b7668decd
  }

}
