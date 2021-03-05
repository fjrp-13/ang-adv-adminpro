import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';

// Le indicamos a Angular que "confíe" que esta función existe (está declarada de forma global en "src/custom.js")
declare function customInitFunctions();

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})

export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public usuario: Usuario;
  public imageFile: File;
  public imageTemp: any = null;
  
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService) {
    this.usuario = usuarioService.usuarioLogeado; // Puntero a "usuarioService.usuarioLogeado"
                                                  // Si se modifica "this.usuario" se modifica tb el del servicio (y al revés)
                                                  // En JS todos los objetos son pasados x Referencia
    this.createForm();
  }

  ngOnInit(): void {
    customInitFunctions(); // Para q haga el fadeOut
  }

  createForm() {
    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  get isNombreInvalid() {
    return this.profileForm.get('nombre').invalid && this.profileForm.get('nombre').touched;
  }

  get isEmailInvalid() {
    return this.profileForm.get('email').invalid && this.profileForm.get('email').touched;
  }

  updateProfile() {
    this.usuarioService.actualizarPerfil(this.profileForm.value)
    .subscribe(resp => {
      const { nombre, email } = resp['usuario'];
      this.usuario.nombre = nombre;
      this.usuario.email = email;
      Swal.fire('Guardado', 'Perfil actualizado', 'success');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
      //Swal.fire('Guardado', 'Perfil actualizado', 'error');
    });
  }

  cambiarImagen(file:File) {
    this.imageFile = file;

    if (!file) {
      this.imageTemp = null;
      return;
    }

    // Preview image for load
    const reader = new FileReader;
    const urlBase64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imageTemp = reader.result;
    }

  }

  updateImage() {
    this.fileUploadService.actualizarFoto(this.imageFile, 'usuarios', this.usuario.uid)
    .then(resp => {
      if (resp.success === true) {
        this.usuario.img = resp.newFilename;
        this.imageTemp = null;

        Swal.fire('Guardado', 'Imagen actualizada', 'success');
      }
    }).catch(err => {
      console.log(err);
      Swal.fire('Error', 'No se ha podido actualizar la imagen', 'error');
    });
  }
}
