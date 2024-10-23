import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnimalAdminComponent } from './add-animal-admin.component';

describe('AddAnimalAdminComponent', () => {
  let component: AddAnimalAdminComponent;
  let fixture: ComponentFixture<AddAnimalAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAnimalAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAnimalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
