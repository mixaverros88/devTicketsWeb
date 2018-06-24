import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePicketPopupComponent } from './date-picket-popup.component';

describe('DatePicketPopupComponent', () => {
  let component: DatePicketPopupComponent;
  let fixture: ComponentFixture<DatePicketPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePicketPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePicketPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
