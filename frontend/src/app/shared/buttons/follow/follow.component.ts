import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Profile, ProfileService, UserService } from 'src/app/core';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css'],
})
export class FollowComponent implements OnInit {
  @Input() mini: boolean = false;
  @Input() toFollow!: string;
  @Output() toggle = new EventEmitter<boolean>();
  isFollowing: boolean = false;
  profile!: Profile;
  itsMe: boolean = false;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  toggleFollowing() {
    this.userService.isAuthenticated.subscribe((auth) => {
      if (!auth) {
        this.router.navigateByUrl('/auth/login');
        return;
      }

      return this.profileService
        .follow(this.toFollow)
        .subscribe((e) => (this.isFollowing = e));
    });
  }

  ngOnInit(): void {
    let currentUser = this.userService.getCurrentUser().username

    if (typeof this.toFollow != 'undefined' && typeof currentUser != "undefined") {
      this.profileService.getProfile(currentUser).subscribe((i) => {
        this.profile = i;
        console.log(i.profile.username, this.toFollow);

        if (i.profile.username == this.toFollow) this.itsMe = true;
      });
    }
  }
}
