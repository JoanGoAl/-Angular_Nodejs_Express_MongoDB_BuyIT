import { ThemeService } from './../../core/services/theme.service';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from 'src/app/core/models';
import { CategoryService } from 'src/app/core/services';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent implements OnInit {
  items!: Array<Category>;

  constructor(
    private catSercice: CategoryService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.catSercice.getCategories().subscribe((docs) => {
      console.log(docs);

      this.items = docs;
    });
  }
}
