import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllContactsComponent } from './get-all-contacts.component';

describe('GetAllContactsComponent', () => {
  let component: GetAllContactsComponent;
  let fixture: ComponentFixture<GetAllContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetAllContactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
