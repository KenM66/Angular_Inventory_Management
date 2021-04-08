import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBinsComponent } from './manage-bins.component';

describe('ManageBinsComponent', () => {
  let component: ManageBinsComponent;
  let fixture: ComponentFixture<ManageBinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
