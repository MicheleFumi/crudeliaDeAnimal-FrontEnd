import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnimaleComponent } from './create-animale.component';

describe('CreateAnimaleComponent', () => {
  let component: CreateAnimaleComponent;
  let fixture: ComponentFixture<CreateAnimaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAnimaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAnimaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
