import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShelterAdminComponent } from './update-shelter-admin.component';

describe('UpdateShelterAdminComponent', () => {
  let component: UpdateShelterAdminComponent;
  let fixture: ComponentFixture<UpdateShelterAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateShelterAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateShelterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
