import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAnimalComponent } from './all-animal.component';

describe('AllAnimalComponent', () => {
  let component: AllAnimalComponent;
  let fixture: ComponentFixture<AllAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllAnimalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
