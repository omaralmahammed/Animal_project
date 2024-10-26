import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyMessegesAdminComponent } from './reply-messeges-admin.component';

describe('ReplyMessegesAdminComponent', () => {
  let component: ReplyMessegesAdminComponent;
  let fixture: ComponentFixture<ReplyMessegesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReplyMessegesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplyMessegesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
