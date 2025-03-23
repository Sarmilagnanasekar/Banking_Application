import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsSchemesComponent } from './savings-schemes.component';

describe('SavingsSchemesComponent', () => {
  let component: SavingsSchemesComponent;
  let fixture: ComponentFixture<SavingsSchemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavingsSchemesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavingsSchemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
