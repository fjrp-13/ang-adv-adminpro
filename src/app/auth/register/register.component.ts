import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Sweet Alert
import Swal from 'sweetalert2'


import { UsuarioService } from '../../services/usuario.service';

// Le indicamos a Angular que "confíe" que esta función existe (está declarada de forma global en "src/custom.js")
declare function customInitFunctions();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public formSubmitted = false;

  constructor(private router: Router,
              private fb: FormBuilder, 
              private usuarioService: UsuarioService) { 
    this.createForm();
  }

  ngOnInit(): void {
    customInitFunctions(); // Para q haga el fadeOut
  }

  createForm() {
    this.registerForm = this.fb.group({
      nombre: ['Web User', [Validators.required, Validators.minLength(2)]],
      // email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]], // https://www.w3resource.com/javascript/form/email-validation.php
      email: ['webuser@email.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      passwordRepeat: ['123456', [Validators.required]],
      terminos: ['', [Validators.required]],
    }, {
      validators: this.equalPasswordsValidator('password', 'passwordRepeat')
    });
  }

  get isNameInvalid() {
    return this.registerForm.get('nombre').invalid && this.registerForm.get('nombre').touched;
  }
  get isEmailInvalid() {
    return this.registerForm.get('email').invalid && this.registerForm.get('email').touched;
  }
  get isPasswordInvalid() {
    return this.registerForm.get('password').invalid && this.registerForm.get('password').touched;
  }
  get isPasswordRepeatedInvalid() {
    return (this.registerForm.get('passwordRepeat').invalid || this.registerForm.get('passwordRepeat').value !== this.registerForm.get('password').value) && this.registerForm.get('passwordRepeat').touched;
  }
  get isTerminosInvalid() {
    return (this.registerForm.get('terminos').invalid ||  this.registerForm.get('terminos').value !== true) && this.registerForm.get('terminos').touched;
  }
  
  equalPasswordsValidator(field1: string, field2: string) {
    // Debe retornar una función...
    return( formGroup: FormGroup) => {
      const pass1Control = formGroup.get(field1);
      const pass2Control = formGroup.get(field2);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null); // Especificamos "null" como error del 2º pwd
      } else {
        pass2Control.setErrors({passwordsNotMatch: true}); // Especificamos un error para el 2º pwd
      }
    }
  }

  submit() {
    if (this.registerForm.invalid) {
      // Si el form es inválido, márcamos los controles como "touched" para que se marquen/muestren los errores
      return Object.values(this.registerForm.controls).forEach( control => {
        // if (control instanceof FormGroup) {
          // Object.values(control.controls).forEach( control => { control.markAsTouched()});
        // } else {
          control.markAsTouched();
        // }
      });
    }

    this.formSubmitted = true;
    // Posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        // Reset del form
        this.registerForm.reset();
        // Redirección al Dashboard
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
}
