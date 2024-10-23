import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatAnimalAdminComponent } from './updat-animal-admin.component';

describe('UpdatAnimalAdminComponent', () => {
  let component: UpdatAnimalAdminComponent;
  let fixture: ComponentFixture<UpdatAnimalAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatAnimalAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatAnimalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
