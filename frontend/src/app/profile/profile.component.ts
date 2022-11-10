import { Component, OnInit } from '@angular/core';
import { UserService, ProductService } from '../core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user?: any
  infoUser?: any
  isAutorized: boolean = false

  option?: any[]

  constructor(
    private userService: UserService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private productService: ProductService
  ) {

  }

  getUser() {

    let auxUser = this.userService.getCurrentUser().username
      ? this.userService.getCurrentUser().username
      : `${this.aRouter.snapshot.paramMap.get('user')}`

    if (this.userService.getCurrentUser().username) this.isAutorized = true

    this.userService.getInfoUser(auxUser).subscribe(data => {
      this.infoUser = data

      this.productService.getUserProducts(this.infoUser.products).subscribe(data => {
        console.log(data);

        this.option = data
      })

    })





  }

  goProduct(slug: string) {
    this.router.navigateByUrl(`/shop/product/${slug}`)
  }

  ngOnInit(): void {
    this.getUser()

    // this.user = this.userService.getCurrentUser().username
  }

}
