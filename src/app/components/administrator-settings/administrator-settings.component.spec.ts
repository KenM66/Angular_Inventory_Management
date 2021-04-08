import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorSettingsComponent } from './administrator-settings.component';

describe('AdministratorSettingsComponent', () => {
  let component: AdministratorSettingsComponent;
  let fixture: ComponentFixture<AdministratorSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
