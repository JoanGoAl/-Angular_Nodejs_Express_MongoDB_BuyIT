import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Product } from 'src/app/core/models';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  filters?: any;
  products!: Product[];

  allCategories?: Category[];

  constructor(private aRouter: ActivatedRoute, private router: Router) {
    this.aRouter.queryParams.subscribe((res) => {
      this.filters = res;
    });
  }

  setProducts(e: any) {
    this.products = e;
  }

  redirect(id?: String) {
    this.router.navigateByUrl(`shop/product/${id}`);
  }

  ngOnInit(): void {}
}
