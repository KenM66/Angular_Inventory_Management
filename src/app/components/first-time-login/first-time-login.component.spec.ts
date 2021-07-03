import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeLoginComponent } from './first-time-login.component';

describe('FirstTimeLoginComponent', () => {
  let component: FirstTimeLoginComponent;
  let fixture: ComponentFixture<FirstTimeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstTimeLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTimeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
