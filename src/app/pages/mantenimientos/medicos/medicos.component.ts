import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MedicoService } from '../../../services/medico.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos:Medico[];
  public idMedicoUpdated: string = '';
  public loading: boolean = true;

  // Para de-suscribirnos en el ngOnDestroy
  public imageSubscription: Subscription;

  constructor(private medicoService:MedicoService,
              private busquedasService: BusquedasService,
              private modalImageService: ModalImageService) { }
  
  ngOnInit(): void {
    this.loadMedicos();
    // Nos suscribimos al observable
    this.imageSubscription = this.modalImageService.imageUpdated
    .pipe(delay(100))
    .subscribe(newFilename => { this.loadMedicos();})
  }

  ngOnDestroy(): void {
    this.imageSubscription.unsubscribe();
  }

  loadMedicos() {
    this.loading = true;
    this.medicoService.loadMedicos().subscribe(medicos=>{
      this.medicos = medicos;
      this.loading = false;
    });
  }
  
  deleteMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Desea eliminar el médico "${medico.nombre}"`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.deleteMedico(medico)
        .subscribe((resp: any) => {
          if (resp.success) {
            Swal.fire(
              'Médico borrado',
              `El médico "${medico.nombre}" se ha borrado correctamente.`,
              'success'
            );
            this.loadMedicos();
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
  
  openModalImage(medico: Medico) {
    this.modalImageService.openModal('medicos', medico.id, medico.img);
  }

  
  searchMedico(query: string) {
    if (query.trim().length == 0) {
      // this.hospitales = this.hospitalesBackup;
      this.loadMedicos();
    } else {
      this.loading = true;
      this.busquedasService.searchByType('medicos', query)
        .subscribe( (resp: any) => {
          this.medicos = resp.data;
          this.loading = false;
        })
    }
  }

}
