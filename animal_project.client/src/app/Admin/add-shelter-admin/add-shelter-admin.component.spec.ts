import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShelterAdminComponent } from './add-shelter-admin.component';

describe('AddShelterAdminComponent', () => {
  let component: AddShelterAdminComponent;
  let fixture: ComponentFixture<AddShelterAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddShelterAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShelterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
