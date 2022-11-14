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
  n_pages: number = 1;
  Arr: Array<number> = [];

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

  setNpages(e: any) { this.n_pages = e }

  setPage(page: number) {
    this.aRouter.url.subscribe((e) => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        let flt = `${atob(e[0].path)}&page=${page || 1}`

        this.router.navigateByUrl(`/shop/${btoa(flt)}`)
      })
    })
  }

  ngOnInit(): void {}
}
