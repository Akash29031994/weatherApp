import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDetailsTableComponent } from './weather-details-table.component';

describe('WeatherDetailsTableComponent', () => {
  let component: WeatherDetailsTableComponent;
  let fixture: ComponentFixture<WeatherDetailsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherDetailsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
