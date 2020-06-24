import { Component, OnInit, Input, AfterViewInit, OnDestroy, NgZone } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-liv-view-other-service-chart',
  templateUrl: './liv-view-other-service-chart.component.html',
  styleUrls: ['./liv-view-other-service-chart.component.css'],
})
export class LivViewOtherServiceChartComponent implements OnInit, AfterViewInit, OnDestroy {
  private otherServiceChart: am4charts.PieChart3D;

  @Input() otherServices;

  constructor(private readonly zone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      if (!this.otherServices) return;

      const chart = am4core.create('other-service-chart', am4charts.PieChart3D);
      chart.data = this.otherServices.map((item) => ({ ...item, color: am4core.color(item.color) }));
      const chartSeries = chart.series.push(new am4charts.PieSeries3D());
      chartSeries.dataFields.category = 'item';
      chartSeries.dataFields.value = 'quantity';
      chartSeries.slices.template.propertyFields.fill = 'color';
      chartSeries.labels.template.disabled = true;
      chartSeries.ticks.template.disabled = true;
      this.otherServiceChart = chart;
    });
  }

  ngOnDestroy(): void {
    this.otherServiceChart?.dispose();
  }

  public get totalAmount(): any {
    if (!this.otherServices) return 0;
    return this.otherServices.reduce((acc, cur) => acc + cur.amount * cur.quantity, 0);
  }

  public get totalQuantity(): any {
    if (!this.otherServices) return 0;
    return this.otherServices.reduce((acc, cur) => acc + cur.quantity, 0);
  }
}
