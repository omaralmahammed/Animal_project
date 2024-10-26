import { Component } from '@angular/core';
import { HadeelService } from '../../Hadeel/hadeel.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RaneemService } from '../../Raneem/raneem.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
  data : any
  OrderArray: any[] = [];
  CategoryArray: any[] = [];
  selectedApplication: any = null;
  isModalOpen: boolean = false;
  AnimalData: any



  ngOnInit() {
    this.GetOrder();
    this.GetCategory();
  }
  constructor(private _ser: HadeelService, private _router: Router, private _src: RaneemService) { }

  GetOrder() {
    this._ser.GetAllOrder().subscribe((data) => {
      this.OrderArray = data;
    })
  }

  openDetailsModal(applicationId: number) {
    
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

  //Reject() {
  
  //}

  Approve(id: any) {
    this._ser.ApprovedAdoption(id,this.data).subscribe((data) => {
      alert("Successfully !");
      this._router.navigate(['/Admin/AllOrder']);
    })
  }

  GetCategory() {
    this._src.GetAllCategory().subscribe((data) => {
      this.CategoryArray = data;
      console.log("All category: ", this.CategoryArray);
    });
  }



  //onCategoryChange(event: Event) {
  //  const target = event.target as HTMLSelectElement;
  //  const categoryId = target.value;

  //  if (categoryId) {
  //    this._ser.getAllAdoptionAnimal(+categoryId).subscribe((data) => {
  //      this.OrderArray = data;
  //    }, (error) => {
  //      Swal.fire({
  //        icon: 'error',
  //        title: 'Error',
  //        text: 'Could not fetch applications. Please try again later.',
  //      });
  //    });
  //  }
  //}


}
