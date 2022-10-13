import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  prevFilters: any

  constructor(
    private router: Router,
    private aRouter: ActivatedRoute,
  ) {
    this.aRouter.queryParams.subscribe(res => {
      this.prevFilters = res
    })
  }

  changeUrl = (e: any) => {

    // this.prevFilters.category = e.target.value

    this.router.navigateByUrl(`shop/filters?category=${e.target.value}`)

  }

  ngOnInit(): void {

  }

}
