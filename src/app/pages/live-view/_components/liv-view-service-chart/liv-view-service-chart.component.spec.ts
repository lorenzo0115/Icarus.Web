import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivViewServiceChartComponent } from './liv-view-service-chart.component';

describe('LivViewServiceChartComponent', () => {
  let component: LivViewServiceChartComponent;
  let fixture: ComponentFixture<LivViewServiceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivViewServiceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivViewServiceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
