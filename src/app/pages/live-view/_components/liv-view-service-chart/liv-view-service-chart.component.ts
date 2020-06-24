import { Component, OnInit, AfterViewInit, OnDestroy, NgZone, Input } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-liv-view-service-chart',
  templateUrl: './liv-view-service-chart.component.html',
  styleUrls: ['./liv-view-service-chart.component.css'],
})
export class LivViewServiceChartComponent implements OnInit, AfterViewInit, OnDestroy {
  private serviceChart: am4charts.PieChart3D;

  @Input() services: any;

  constructor(private readonly zone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      if (!this.services) return;

      const chart = am4core.create('service-chart', am4charts.PieChart3D);
      chart.data = this.services.map((item) => ({ ...item, color: am4core.color(item.color) }));
      const chartSeries = chart.series.push(new am4charts.PieSeries3D());
      chartSeries.dataFields.category = 'item';
      chartSeries.dataFields.value = 'quantity';
      chartSeries.slices.template.propertyFields.fill = 'color';
      chartSeries.labels.template.disabled = true;
      chartSeries.ticks.template.disabled = true;
      this.serviceChart = chart;
    });
  }

  ngOnDestroy(): void {
    this.serviceChart?.dispose();
  }

  public get totalAmount(): any {
    if (!this.services) return 0;
    return this.services.reduce((acc, cur) => acc + cur.amount, 0);
  }

  public get totalQuantity(): any {
    if (!this.services) return 0;
    return this.services.reduce((acc, cur) => acc + cur.quantity, 0);
  }
}
