import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAnimalAdminComponent } from './get-animal-admin.component';

describe('GetAnimalAdminComponent', () => {
  let component: GetAnimalAdminComponent;
  let fixture: ComponentFixture<GetAnimalAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetAnimalAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAnimalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
