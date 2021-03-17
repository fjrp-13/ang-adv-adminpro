import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Usuario } from '../../../models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})

export class UsuariosComponent implements OnInit, OnDestroy {
  public fromUser: number = 0;
  public usersPerPage: number = 5;
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];

  public totalUsuariosBackup: number = 0;
  public usuariosBackup: Usuario[] = [];
  public usuarioLogeado: Usuario;

  public uidRoleUpdated: string = '';
  public loading: boolean = true;

  // Para de-suscribirnos en el ngOnDestroy
  public imageSubscription: Subscription;

  constructor(private usuarioService: UsuarioService,
              private busquedasService: BusquedasService,
              private modalImageService: ModalImageService) { }

  ngOnInit(): void {
    this.loadUsuarios(this.fromUser, this.usersPerPage);
    this.usuarioLogeado = this.usuarioService.usuarioLogeado;
    // Nos suscribimos al observable
    this.imageSubscription = this.modalImageService.imageUpdated
      .pipe(delay(100))
      .subscribe(newFilename => { this.loadUsuarios(this.fromUser, this.usersPerPage);})
  }

  ngOnDestroy(): void {
    this.imageSubscription.unsubscribe();
  }

  loadUsuarios(fromUser: number, usersPerPage: number) {
    this.loading = true;
    this.usuarioService.loadUsers(fromUser, usersPerPage)
      // // Este código es equivalente al de abajo
      // .subscribe( resp => {
      //   this.totalUsuarios = resp.total;
      //   this.usuarios = resp.usuarios;
      // })
      .subscribe( ({total, usuarios}) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.totalUsuariosBackup = total;
        this.usuariosBackup = usuarios;
        // console.log(usuarios);
        this.loading = false;
      })
  }

  searchUsuarios(query: string) {
    if (query.trim().length == 0) {
      this.usuarios = this.usuariosBackup;
      this.totalUsuarios = this.totalUsuariosBackup;
    } else {
      this.loading = true;
      this.busquedasService.searchByType('usuarios', query)
        .subscribe( (resp: any) => {
          this.totalUsuarios = resp.total;
          this.usuarios = resp.data;
          this.loading = false;
        })
    }
  }

  deleteUsuario(usuario: Usuario) {
    if (usuario.uid == this.usuarioService.usuarioLogeado.uid) {
      return Swal.fire(
        'Error',
        'No puede borrar su propio usuario',
        'error'
      );
    }
  
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Desea eliminar el usuario "${usuario.nombre}"`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUser(usuario)
        .subscribe((resp: any) => {
          if (resp.success) {
            Swal.fire(
              'Usuario borrado',
              `El usuario "${usuario.nombre}" se ha borrado correctamente.`,
              'success'
            );
            this.loadUsuarios(this.fromUser, this.usersPerPage);
          } else {
            Swal.fire(
              'Error',
              resp.msg,
              'error'
            )
          }
        })
      }
    })
  }

  prevPage() {
    if (this.fromUser > 0) {
      this.fromUser -= this.usersPerPage;
      if (this.fromUser < 0) {
        this.fromUser = 0;
      }
      this.loadUsuarios(this.fromUser, this.usersPerPage);
    }
  }

  nextPage() {
    if ((this.fromUser + this.usersPerPage) < this.totalUsuarios) {
      this.fromUser += this.usersPerPage;
      if (this.fromUser >= this.totalUsuarios) {
        this.fromUser = this.totalUsuarios - 1;
      }
      if (this.fromUser >= this.totalUsuarios) {
        this.fromUser = this.totalUsuarios - 1;
      }
      this.loadUsuarios(this.fromUser, this.usersPerPage);
    }
  }

  changeRole(usuario: Usuario) {
    this.usuarioService.updateUser(usuario)
    .subscribe((resp: any) => {
      if (resp.success) {
        this.uidRoleUpdated = usuario.uid;
        setTimeout(() => {
          this.uidRoleUpdated = ''
        }, 1*1000);
      } else {
        this.uidRoleUpdated = '';
        Swal.fire(
          'Error',
          resp.msg,
          'error'
        )
      }
    })
  }

  openModalImage(usuario: Usuario) {
    this.modalImageService.openModal('usuarios', usuario.uid, usuario.img);
  }
}
