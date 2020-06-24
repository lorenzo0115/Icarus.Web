import { Component, OnInit, Input, AfterViewInit, OnDestroy, NgZone } from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-liv-view-asset-chart',
  templateUrl: './liv-view-asset-chart.component.html',
  styleUrls: ['./liv-view-asset-chart.component.css'],
})
export class LivViewAssetChartComponent implements OnInit, AfterViewInit, OnDestroy {
  private assetChart: am4charts.PieChart3D;

  @Input() assets;

  constructor(private readonly zone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      if (!this.assets) return;

      const chart = am4core.create('asset-chart', am4charts.PieChart3D);
      chart.data = this.assets.map((item) => ({ ...item, color: am4core.color(item.color) }));
      const chartSeries = chart.series.push(new am4charts.PieSeries3D());
      chartSeries.dataFields.category = 'item';
      chartSeries.dataFields.value = 'quantity';
      chartSeries.slices.template.propertyFields.fill = 'color';
      chartSeries.labels.template.disabled = true;
      chartSeries.ticks.template.disabled = true;
      this.assetChart = chart;
    });
  }

  ngOnDestroy(): void {
    this.assetChart?.dispose();
  }

  public get totalQuantity(): any {
    if (!this.assets) return 0;
    return this.assets.reduce((acc, cur) => acc + cur.quantity, 0);
  }
}
