import { Component } from '@angular/core';
import { HadeelService } from '../hadeel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  ngOnInit() {
    this.GetRandomFourAnimals();
    this.GetRandomFourCategory();
    this.GetRandomFourPosts();
  }
  constructor(private _ser: HadeelService) { }

  Animals: any
  Category: any
  Sheltter: any

  GetRandomFourAnimals() {
    this._ser.RandomAnimals().subscribe((data) => {
      this.Animals = data;
    })
  }

  GetRandomFourCategory() {
    this._ser.RandomCategory().subscribe((data) => {
      this.Category = data;
    })
  }


  GetRandomFourPosts() {
    this._ser.RandomPosts().subscribe((data) => {
      this.Sheltter = data;
    })
  }


}
