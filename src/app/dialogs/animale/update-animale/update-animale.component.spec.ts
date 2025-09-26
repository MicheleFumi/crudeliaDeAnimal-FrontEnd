import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAnimaleComponent } from './update-animale.component';

describe('UpdateAnimaleComponent', () => {
  let component: UpdateAnimaleComponent;
  let fixture: ComponentFixture<UpdateAnimaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAnimaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAnimaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
