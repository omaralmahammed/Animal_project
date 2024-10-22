import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCategoryAdminComponent } from './get-category-admin.component';

describe('GetCategoryAdminComponent', () => {
  let component: GetCategoryAdminComponent;
  let fixture: ComponentFixture<GetCategoryAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetCategoryAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetCategoryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
