import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetByStoryIdComponent } from './get-by-story-id.component';

describe('GetByStoryIdComponent', () => {
  let component: GetByStoryIdComponent;
  let fixture: ComponentFixture<GetByStoryIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetByStoryIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetByStoryIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
