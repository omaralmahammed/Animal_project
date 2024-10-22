import { Component } from '@angular/core';
import { RaneemService } from '../raneem.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-animal',
  templateUrl: './all-animal.component.html',
  styleUrl: './all-animal.component.css'
})
export class AllAnimalComponent {

  parameter: any
  ngOnInit() {
    this.parameter = this._route.snapshot.paramMap.get("id");
    this.getAnimal(this.parameter);
  }
 AnimalData: any
  constructor(private _ser: RaneemService, private _route: ActivatedRoute) { }
  getAnimal(id: any) {
    this._ser.getAllAnimal(id).subscribe((data) => {
      this.AnimalData = data
      console.log("this.AnimalData", this.AnimalData)
    })
  }
}
