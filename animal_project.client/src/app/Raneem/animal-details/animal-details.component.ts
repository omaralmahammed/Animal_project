import { Component } from '@angular/core';
import { RaneemService } from '../raneem.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrl: './animal-details.component.css'
})
export class AnimalDetailsComponent {
  parameter: any
  array: any
  ngOnInit() {
    this.parameter = this._rout.snapshot.paramMap.get('id');
    this.getDetails(this.parameter)
    console.log(this.Detailsanimal, "details")
  }

  constructor(private _ser: RaneemService, private _rout: ActivatedRoute) { }

  Detailsanimal: any
  getDetails(id: any) {
    this._ser.getAnimalDetails(id).subscribe((data) => {

      this.Detailsanimal = data
    })

  }
}
