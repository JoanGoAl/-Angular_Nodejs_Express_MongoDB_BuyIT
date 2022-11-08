import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api'

import { UserService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BuyIT';

  constructor(
    private primeNGConfig: PrimeNGConfig,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.primeNGConfig.ripple = true
    this.userService.populate();

  }

}
