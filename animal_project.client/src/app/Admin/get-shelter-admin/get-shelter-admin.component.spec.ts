import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetShelterAdminComponent } from './get-shelter-admin.component';

describe('GetShelterAdminComponent', () => {
  let component: GetShelterAdminComponent;
  let fixture: ComponentFixture<GetShelterAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetShelterAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetShelterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
