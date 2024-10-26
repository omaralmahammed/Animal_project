import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserApplicationComponent } from './get-user-application.component';

describe('GetUserApplicationComponent', () => {
  let component: GetUserApplicationComponent;
  let fixture: ComponentFixture<GetUserApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetUserApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetUserApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
