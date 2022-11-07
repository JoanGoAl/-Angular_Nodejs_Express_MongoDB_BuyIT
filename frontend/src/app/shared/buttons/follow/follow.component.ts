import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, of, tap } from 'rxjs';
import { Profile, ProfileService, UserService } from 'src/app/core';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css'],
})
export class FollowComponent implements OnInit {
  @Input() mini: boolean = false;
  @Input() profile!: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  isFollowing() {
    return false;
  }

  toggleFollowing() {
    this.isSubmitting = true;

    console.log('A');


    this.userService.isAuthenticated.pipe(
      concatMap((authenticated) => {

        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

        if (!this.profile.following) {
          return this.profileService.follow(this.profile.username).pipe(
            tap(
              (data) => {
                this.isSubmitting = false;
                this.toggle.emit(true);
              },
              (err) => (this.isSubmitting = false)
            )
          );
        } else {
          return this.profileService.unfollow(this.profile.username).pipe(
            tap(
              (data) => {
                this.isSubmitting = false;
                this.toggle.emit(false);
              },
              (err) => (this.isSubmitting = false)
            )
          );
        }
      })
    ).subscribe(() => this.cd.markForCheck())
  }

  ngOnInit(): void {}
}
