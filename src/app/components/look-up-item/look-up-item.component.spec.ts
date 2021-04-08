import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookUpItemComponent } from './look-up-item.component';

describe('LookUpItemComponent', () => {
  let component: LookUpItemComponent;
  let fixture: ComponentFixture<LookUpItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookUpItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookUpItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
