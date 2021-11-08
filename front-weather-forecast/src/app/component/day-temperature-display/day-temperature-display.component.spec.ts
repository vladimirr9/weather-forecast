import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTemperatureDisplayComponent } from './day-temperature-display.component';

describe('DayTemperatureDisplayComponent', () => {
  let component: DayTemperatureDisplayComponent;
  let fixture: ComponentFixture<DayTemperatureDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayTemperatureDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayTemperatureDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
