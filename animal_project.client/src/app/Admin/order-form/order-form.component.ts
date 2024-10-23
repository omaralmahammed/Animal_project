import { Component } from '@angular/core';
import { HadeelService } from '../../Hadeel/hadeel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
  OrderArray: any[] = [];
  selectedApplication: any = null;
  isModalOpen: boolean = false;
  ngOnInit() {
    this.GetOrder();
  }
  constructor(private _ser: HadeelService) { }

  GetOrder() {
    this._ser.GetAllOrder().subscribe((data) => {
      this.OrderArray = data;
    })
  }

  openDetailsModal(applicationId: number) {
    debugger
    this._ser.GetAllOrderDetails(applicationId).subscribe((data) => {
      this.selectedApplication = data;

      // Show the modal using JavaScript
      this.isModalOpen = true; // Open the modal
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Could not fetch details. Please try again later.',
      });
    })
  }

  closeModal() {
    this.isModalOpen = false; // Close the modal
    this.selectedApplication = null; // Clear selected application
  }

  Reject() {

  }

  Approve() {

  }
}
