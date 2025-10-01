import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinariMedicoComponent } from './veterinari-medico.component';

describe('VeterinariMedicoComponent', () => {
  let component: VeterinariMedicoComponent;
  let fixture: ComponentFixture<VeterinariMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VeterinariMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeterinariMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
