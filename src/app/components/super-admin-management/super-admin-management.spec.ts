import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminManagement } from './super-admin-management';

describe('SuperAdminManagement', () => {
  let component: SuperAdminManagement;
  let fixture: ComponentFixture<SuperAdminManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperAdminManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperAdminManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
