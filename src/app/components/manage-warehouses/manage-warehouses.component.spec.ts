import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWarehousesComponent } from './manage-warehouses.component';

describe('ManageWarehousesComponent', () => {
  let component: ManageWarehousesComponent;
  let fixture: ComponentFixture<ManageWarehousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageWarehousesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
