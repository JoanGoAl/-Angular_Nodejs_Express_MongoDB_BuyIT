import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from 'src/app/core/models';
import { CategoryService } from 'src/app/core/services';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  goShopFilters(title: String) {
    this.router.navigateByUrl(`shop?cat=${title.toLowerCase()}`);
  }

  ngOnInit(): void {
    this.catSercice.getCategories().subscribe((docs) => {
      this.items = docs;
    });
  }
}
