import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewBinComponent } from './create-new-bin.component';

describe('CreateNewBinComponent', () => {
  let component: CreateNewBinComponent;
  let fixture: ComponentFixture<CreateNewBinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewBinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewBinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
