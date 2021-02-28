import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

// Sweet Alert
import Swal from 'sweetalert2'

import { UsuarioService } from '../../services/usuario.service';

// Le indicamos a Angular que "confíe" que esta función existe (está declarada de forma global en "src/custom.js")
declare function customInitFunctions();
// Le indicamos a Angular que "confíe" que esta constante existe (es para Google Sign-in la define el script "https://apis.google.com/js/platform.j" que se carga en "index.html")
declare const gapi:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public formSubmitted = false;
  constructor(private router: Router,
              private fb: FormBuilder, 
              private usuarioService: UsuarioService) {
    this.createForm();
  }

  ngOnInit(): void {
    customInitFunctions(); // Para q haga el fadeOut
    this.googleSigninRenderButton();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false],
    });
  }

  get isEmailInvalid() {
    return this.loginForm.get('email').invalid && this.loginForm.get('email').touched;
  }
  get isPasswordInvalid() {
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
  }

  login() {
    if (this.loginForm.invalid) {
      // Si el form es inválido, márcamos los controles como "touched" para que se marquen/muestren los errores
      return Object.values(this.loginForm.controls).forEach( control => {
        // if (control instanceof FormGroup) {
          // Object.values(control.controls).forEach( control => { control.markAsTouched()});
        // } else {
          control.markAsTouched();
        // }
      });
    }

    // Login
    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp => {

        // Remember Email
        this.doRemember();
        console.log(resp);
        // Reset del form
        this.resetForm();
        // Redirección al Dashboard
//        this.router.navigateByUrl('/');
      }, (err) => {
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  doRemember() {
    if (this.loginForm.get('remember').value) {
      localStorage.setItem('email', this.loginForm.get('email').value);
    } else {
      localStorage.removeItem('email');
    }
  }

  resetForm() {
    this.loginForm.reset();
    this.loginForm.patchValue({email: (localStorage.getItem('email') || '')});
  }

  googleSigninOnSuccess(googleUser) {
    // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
  }
  googleSigninOnFailure(error) {
    console.log(error);
  }
  googleSigninRenderButton() {
    const idDiv = 'my-signin2';
    gapi.signin2.render(idDiv, {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.googleSigninOnSuccess,
      'onfailure': this.googleSigninOnFailure
    });
  }

}
