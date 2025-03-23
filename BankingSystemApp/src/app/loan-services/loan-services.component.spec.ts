import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanServicesComponent } from './loan-services.component';

describe('LoanServicesComponent', () => {
  let component: LoanServicesComponent;
  let fixture: ComponentFixture<LoanServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
