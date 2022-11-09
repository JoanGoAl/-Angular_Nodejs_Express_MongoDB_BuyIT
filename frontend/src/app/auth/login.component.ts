import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../core/services';
// import {NotificationService} from '../core/services';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./auth.component.css']
})
export class LoginComponent implements OnInit {
    authType: String = '/login';
    // title: String = '';
    isSubmitting = false;
    form: FormGroup;

    errorUsermame: String = '';
    errorEmail: String = '';

    constructor(
        private router: Router,
        private userService: UserService,
        private fb: FormBuilder,
        //   private cd: ChangeDetectorRef,
        //   // private notifyService: NotificationService
    ) {
        //   // use FormBuilder to create a form group
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(3)]],
        });
    }

    ngOnInit() {
    }

    login() {
        this.isSubmitting = true;
        const credentials = this.form.value;

        this.userService.attemptAuth(this.authType, credentials).subscribe(
            (data: any) => {
                if (data.msg) {
                    console.log('No registrado');

                } else {
                    this.router.navigateByUrl('/');
                }

                // this.notifyService.showSuccess('Ya estás dentro', 'Bualabob');
            },
            (err) => {
                // this.notifyService.showError(
                //   'Ha habido algún error en el formulario, compruebe que los datos estén corréctamente',
                //   'Bualabob'
                // );
                console.log(err);


                this.isSubmitting = false;
                // this.cd.markForCheck();
            }
        );
    }
}
