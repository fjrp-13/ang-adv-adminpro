import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

// Le indicamos a Angular que "confíe" que esta función existe (está declarada de forma global en "src/custom.js")
declare function customInitFunctions();

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    customInitFunctions(); // Para q haga el fadeOut
    // Suscripción al cambio de parámetros de la URL de la página
    this.activatedRoute.params.subscribe(params => {
      this.searchGlobal(params.searchValue);
    })
  }

  searchGlobal(searchValue: string) {

    this.busquedasService.searchGlobal(searchValue)
    .subscribe((resp: any) => {
      // console.log('resp');
      this.usuarios = resp.data.usuarios;
      this.medicos = resp.data.medicos;
      this.hospitales = resp.data.hospitales;
    }, (err) => {
      console.log('err');
      console.log(err);
      Swal.fire('error', err.error.msg, 'error'); 
      // Swal.fire('Error', err.error.msg, 'error');
    })
  }
}
