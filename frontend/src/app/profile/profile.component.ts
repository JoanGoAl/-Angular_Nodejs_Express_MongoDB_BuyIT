import { Component, OnInit } from '@angular/core';
import { UserService } from '../core';
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

  products?: any[]

  constructor(
    private userService: UserService,
    private router: Router,
    private aRouter: ActivatedRoute,
  ) {

  }

  getUser() {

    let auxUser = this.userService.getCurrentUser().username
      ? this.userService.getCurrentUser().username
      : `${this.aRouter.snapshot.paramMap.get('user')}`

    if (this.userService.getCurrentUser().username) this.isAutorized = true

    this.userService.getInfoUser(auxUser).subscribe(data => {
      this.infoUser = data
    })

  }

  ngOnInit(): void {
    this.getUser()

    // this.user = this.userService.getCurrentUser().username
  }

}
