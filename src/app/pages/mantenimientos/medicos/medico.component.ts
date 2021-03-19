import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MedicoService } from '../../../services/medico.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';

// Le indicamos a Angular que "confíe" que esta función existe (está declarada de forma global en "src/custom.js")
declare function customInitFunctions();

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})

export class MedicoComponent implements OnInit, OnDestroy {
  public medicoForm: FormGroup;
  public formSubmitted = false;

  public medico: Medico;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;

  // Para de-suscribirnos en el ngOnDestroy
  public imageSubscription: Subscription;

  constructor(private router: Router,
              private fb: FormBuilder, 
              private hospitalService:HospitalService,
              private medicoService:MedicoService,
              private modalImageService: ModalImageService,
              private activatedRoute: ActivatedRoute) { 
    this.createForm();
}
  // constructor(private medicoService:MedicoService,
  //   private busquedasService: BusquedasService,
  //   private modalImageService: ModalImageService) { }

  ngOnInit(): void {
    customInitFunctions(); // Para q haga el fadeOut
    // Suscripción al cambio de parámetros de la URL de la página
    this.activatedRoute.params.subscribe(params => {
      this.loadMedico(params.id);
    })
    
    // Nos suscribimos al observable del cambio de foto/imagen
    this.imageSubscription = this.modalImageService.imageUpdated
      .pipe(delay(100))
      .subscribe(newFilename => { this.medico.img=newFilename;})

    this.loadHospitales();
  }

  ngOnDestroy(): void {
    this.imageSubscription.unsubscribe();
  }

  createForm() {
    this.medicoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      hospital: ['', [Validators.required]],
    });

    // Crear un Observable que esté pendiente del campo "hospital"
    this.medicoForm.get('hospital').valueChanges
      .subscribe(idHospital => {
        this.hospitalSeleccionado = this.hospitales.find(hospital => {
          return hospital.id == idHospital
        })
      })
  }
  
  get isNombreInvalid() {
    return this.medicoForm.get('nombre').invalid && this.medicoForm.get('nombre').touched;
  }

  guardarMedico() {
    if (this.medico) {
      // actualizar
      const data = {
        ...this.medicoForm.value,
        id: this.medico.id
      }
      this.medicoService.updateMedico(data)
        .subscribe((resp:any) => {
          if (resp.success) {
            this.medico = resp.medico;
            Swal.fire('Guardado', 'Médico guardado', 'success');
            this.router.navigateByUrl(`/dashboard/medico/${this.medico.id}`);
          } else {
            console.log(resp);
            Swal.fire('error', resp.msg, 'error'); 
          }
        }, (err) => {
          console.log(err);
          // Swal.fire('Error', err.error.msg, 'error');
        })
    } else {
      // Crear nuevo médico
      this.medico = new Medico(this.medicoForm.get('nombre').value);
      this.medico.hospital = this.medicoForm.get('hospital').value;
      this.medicoService.crearMedico(this.medico)
      .subscribe((resp:any) => {
        if (resp.success) {
          this.medico = resp.medico;
          Swal.fire('Guardado', 'Médico guardado', 'success');
          this.router.navigateByUrl(`/dashboard/medico/${this.medico.id}`);
        } else {
          console.log(resp);
          Swal.fire('error', resp.msg, 'error'); 
        }
      }, (err) => {
        console.log(err);
        // Swal.fire('Error', err.error.msg, 'error');
      })
    }
  }

  loadMedico(id: string) {
    if (id.toLowerCase() === 'nuevo') {
      return;
    }
    this.medicoService.loadMedico(id)
      .pipe(delay(100)) // Para que detecte el "cambio" en la imagen del hospital y se ejecute el Observable que esté pendiente del campo "hospital"
      .subscribe((resp: any) => {
        if (!resp) {
          this.router.navigateByUrl(`/dashboard/medicos`);
        }
        this.medico = resp;
        const {nombre, hospital:{_id}} = resp;
        // Param del setValue: objeto con los valores en el mismo orden que al crear el formulario en el "createForm" (... = this.fb.group)
        this.medicoForm.setValue({nombre, hospital:_id});
      }, (err) => {
        Swal.fire('error', err.error.msg, 'error'); 
        // Swal.fire('Error', err.error.msg, 'error');
      })
  }

  loadHospitales() {
    this.hospitalService.loadHospitales()
      .subscribe(resp => {
        // console.log(resp);
        this.hospitales = resp;
      })
  }

  openModalImage(medico: Medico) {
    this.modalImageService.openModal('medicos', medico.id, medico.img);
  }
}
