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

  values?: any[]
  favorites?: any[]
  products?: any[]
  following?: any[];

  option: 'products' | 'favorites' | 'following' = 'products'

  constructor(
    private userService: UserService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private productService: ProductService
  ) { }

  getUser() {

    let actualUser = this.userService.getCurrentUser().username

    let auxUser = this.aRouter.snapshot.paramMap.get('user')
      ? `${this.aRouter.snapshot.paramMap.get('user')}`
      : this.userService.getCurrentUser().username

    if (actualUser) {
      this.isAutorized = true
      this.getAutorizedUser(auxUser)
    } else {
      this.isAutorized = false
      this.getUnautorizedUser(auxUser)
    }

  }

  getAutorizedUser(user: string) {
    if (user != this.userService.getCurrentUser().username) {
      this.isAutorized = false
    }

    this.userService.getInfoUser(user).subscribe(data => {
      this.infoUser = data

        this.productService.getUserProducts(this.infoUser.products).subscribe(data => {
          this.products = data
        })
      console.log(data);


      this.productService.getUserProducts(this.infoUser.products).subscribe(data => {
        this.products = data
      })

        this.productService.getUserProducts(this.infoUser.favorites).subscribe(data => {
          this.favorites = data
      })

      this.userService.getUserFollowing(this.infoUser.following).subscribe(data => {
        console.log(data);

        this.following = data
      })

    })
  }

  changeOption(newValue: 'products' | 'favorites' | 'following') {
    this.option = newValue;
    this.values = this[newValue]
  }

  getUnautorizedUser(user: string) {
    this.userService.getInfoUser(user).subscribe(data => {
      this.infoUser = data

      this.productService.getUserProducts(this.infoUser.products).subscribe(data => {
        this.values = data
      })

    })
  }

  goProduct(slug: string) {
    this.router.navigateByUrl(`/shop/product/${slug}`)
  }

  ngOnInit(): void {
    this.getUser()
    setTimeout(() => {
      this.values = this.products
    }, 100);
  }

}
