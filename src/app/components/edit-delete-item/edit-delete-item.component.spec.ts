import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteItemComponent } from './edit-delete-item.component';

describe('EditDeleteItemComponent', () => {
  let component: EditDeleteItemComponent;
  let fixture: ComponentFixture<EditDeleteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeleteItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeleteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
