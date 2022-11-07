import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {
  @Input() mini: boolean = false

  constructor() { }

  isFollowing() { return false }

  follow() {

  }

  ngOnInit(): void {
  }

}
