import { Component, OnInit } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {
  public imageFile: File;
  public imageTemp: any = null;
  
  constructor(public fileUploadService: FileUploadService,
              public modalImageService: ModalImageService) {}

  ngOnInit(): void {
  }

  closeModal() {
    this.imageTemp = null;
    this.modalImageService.closeModal();
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
    this.fileUploadService.actualizarFoto(this.imageFile, this.modalImageService.type, this.modalImageService.id)
    .then(resp => {
      if (resp.success === true) {
        // console.log(resp);
        // this.usuario.img = resp.newFilename;
        this.imageTemp = null;
        this.modalImageService.imageUpdated.emit(resp.newFilename);
        this.closeModal();
      }
    }).catch(err => {
      console.log(err);
      Swal.fire('Error', 'No se ha podido actualizar la imagen', 'error');
    });
  }
}
