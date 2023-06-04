import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-description-modal',
  templateUrl: './description-modal.component.html',
  styleUrls: ['./description-modal.component.css']
})

export class DescriptionModalComponent {
  description: string = '';

  constructor(private modalRef: BsModalRef) { }

  closeModal(): void {
    this.modalRef.hide();
  }
}
