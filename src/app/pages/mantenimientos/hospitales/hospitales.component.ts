import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { ModalImageService } from '../../../services/modal-image.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales:Hospital[];
  // public hospitalesBackup:Hospital[];
  public idHospitalUpdated: string = '';
  public loading: boolean = true;

  // Para de-suscribirnos en el ngOnDestroy
  public imageSubscription: Subscription;

  constructor(private hospitalService:HospitalService,
              private busquedasService: BusquedasService,
              private modalImageService: ModalImageService) { }

  ngOnInit(): void {
    this.loadHospitales();
    // Nos suscribimos al observable del cambio de foto/imagen
    this.imageSubscription = this.modalImageService.imageUpdated
    .pipe(delay(100))
    .subscribe(newFilename => { this.loadHospitales();})
  }
  
  ngOnDestroy(): void {
    this.imageSubscription.unsubscribe();
  }

  loadHospitales() {
    this.loading = true;
    this.hospitalService.loadHospitales().subscribe(hospitales=>{
      this.hospitales = hospitales;
      // this.hospitalesBackup = hospitales;
      this.loading = false;
    });
  }

  searchHospitales(query: string) {
    console.log(query);
    if (query.trim().length == 0) {
      // this.hospitales = this.hospitalesBackup;
      this.loadHospitales();
    } else {
      this.loading = true;
      this.busquedasService.searchByType('hospitales', query)
        .subscribe( (resp: any) => {
          this.hospitales = resp.data;
          this.loading = false;
        })
    }
  }

  updateHospital(hospital) {
    this.hospitalService.updateHospital(hospital)
    .subscribe((resp: any) => {
      if (resp.success) {
        this.idHospitalUpdated = hospital.id;
        setTimeout(() => {
          this.idHospitalUpdated = ''
        }, 1*1000);
      } else {
        this.idHospitalUpdated = '';
        Swal.fire(
          'Error',
          resp.msg,
          'error'
        )
      }
    }, (error) => {
      // console.log(error);
      this.idHospitalUpdated = '';
      Swal.fire(
        'Error',
        error.error.msg,
        'error'
      )
    })
  }
  
  deleteHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Borrar hospital?',
      text: `Desea eliminar el hospital "${hospital.nombre}"`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.deleteHospital(hospital.id)
        .subscribe((resp: any) => {
          if (resp.success) {
            Swal.fire(
              'Hospital borrado',
              `El hospital "${hospital.nombre}" se ha borrado correctamente.`,
              'success'
            );
            this.loadHospitales();
          } else {
            Swal.fire(
              'Error',
              resp.msg,
              'error'
            )
          }
        }, (error) => {
          // console.log(error);
          Swal.fire(
            'Error',
            error.error.msg,
            'error'
          )
        })
      }
    })
  }

  async newHospital() {
    const valor = await Swal.fire({
      input: 'text',
      title: 'Crear hospital',
      inputLabel: 'Nombre del hospital',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe especificar el nombre del hospital'
        }
      }
    })
    
    if (valor.value) {
      this.createHospital(valor.value);
    }
  }

  createHospital(nombre: string) {
    this.hospitalService.crearHospital(nombre)
    .subscribe((resp: any) => {
      if (resp.success) {
        Swal.fire(
          'Hospital creado',
          `El hospital "${nombre}" se ha creado correctamente.`,
          'success'
        );
        // this.loadHospitales();
        this.hospitales.push(resp.hospital);
      } else {
        Swal.fire(
          'Error',
          resp.msg,
          'error'
        )
      }
    }, (error) => {
      Swal.fire(
        'Error',
        error.error.msg,
        'error'
      )
    })
  }
  openModalImage(hospital: Hospital) {
    this.modalImageService.openModal('hospitales', hospital.id, hospital.img);
  }
}
