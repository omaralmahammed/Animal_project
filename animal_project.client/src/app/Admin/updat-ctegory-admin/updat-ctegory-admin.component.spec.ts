import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatCtegoryAdminComponent } from './updat-ctegory-admin.component';

describe('UpdatCtegoryAdminComponent', () => {
  let component: UpdatCtegoryAdminComponent;
  let fixture: ComponentFixture<UpdatCtegoryAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatCtegoryAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatCtegoryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
