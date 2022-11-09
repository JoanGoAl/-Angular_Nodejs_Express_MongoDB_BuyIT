import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../core/services';
// import {NotificationService} from '../core/services';
@Component({
  selector: 'app-auth',
  templateUrl: './register.component.html',
  styleUrls: ['./auth.component.css']
})
export class RegisterComponent implements OnInit {
  authType: String = '/register';
  // title: String = '';
  isSubmitting = false;
  form: FormGroup;

  errorUsermame: String = '';
  errorEmail: String = '';
  errorPasswd: String = '';

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
      email: ['', [Validators.required]],
      // email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rePassword: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  register() {

    console.log('hola');


    if (this.form.value.username.length < 4) {
      this.errorUsermame = 'La contraseña debe tener al menos 4 caracteres';
    } else this.errorUsermame = ''
    if (this.form.value.email.length < 4) {
      this.errorEmail = 'El email es erroneo';
    } else this.errorEmail = ''
    if ((this.form.value.password !== this.form.value.rePassword) || (this.form.value.password.length < 4 || this.form.value.rePassword.length < 4)) {
      this.errorPasswd = 'Las contraseñas no coinciden';
    } else this.errorPasswd = ''

    if (this.errorUsermame === '' && this.errorEmail === '' && this.errorPasswd === '') {
      console.log('Todo correcto');
      this.isSubmitting = true;
      const credentials = {
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password
      };

      this.userService.attemptAuth(this.authType, credentials).subscribe(
        (data: any) => {
          if (data.msg) {
            console.log('No registrado');

          } else {
            this.router.navigateByUrl('/');
          }
        },
        (err) => {
          this.isSubmitting = false;
        }
      );
    }
  }
}