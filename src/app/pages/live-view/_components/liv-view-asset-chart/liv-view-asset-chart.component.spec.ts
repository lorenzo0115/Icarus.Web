import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivViewAssetChartComponent } from './liv-view-asset-chart.component';

describe('LivViewAssetChartComponent', () => {
  let component: LivViewAssetChartComponent;
  let fixture: ComponentFixture<LivViewAssetChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivViewAssetChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivViewAssetChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
