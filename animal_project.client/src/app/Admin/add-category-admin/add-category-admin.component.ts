import { Component } from '@angular/core';
import { RaneemService } from '../../Raneem/raneem.service';

@Component({
  selector: 'app-add-category-admin',
  templateUrl: './add-category-admin.component.html',
  styleUrl: './add-category-admin.component.css'
})
export class AddCategoryAdminComponent {

  image: any;

  constructor(private _src: RaneemService) { }

  changeImage(event: any) {
    this.image = event.target.files[0];
  }

  AddNewCategory(data: any) {
    var form = new FormData();

    // التحقق من تعبئة جميع الحقول المطلوبة
    if (!data.name || !data.description || !this.image) {
      alert("Please fill in all required fields.");
      return; // إيقاف العملية إذا كانت الحقول غير مكتملة
    }

    for (let key in data) {
      form.append(key, data[key]);
    }
    form.append("image", this.image);

    this._src.AddCategory(form).subscribe(() => {
      alert("Added Successfully");
    });
  }
}
