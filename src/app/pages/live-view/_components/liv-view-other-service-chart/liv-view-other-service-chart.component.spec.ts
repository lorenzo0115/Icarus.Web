import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivViewOtherServiceChartComponent } from './liv-view-other-service-chart.component';

describe('LivViewOtherServiceChartComponent', () => {
  let component: LivViewOtherServiceChartComponent;
  let fixture: ComponentFixture<LivViewOtherServiceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivViewOtherServiceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivViewOtherServiceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
