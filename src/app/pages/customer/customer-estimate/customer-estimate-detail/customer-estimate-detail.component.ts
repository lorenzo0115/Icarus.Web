import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';

import { Subject } from 'rxjs/Subject';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { filter } from 'rxjs/operators/filter';

import isEmpty from 'lodash/isEmpty';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

import { TreeMapComponent } from 'src/app/component/tree-map/tree-map.component';

import { utility } from 'src/app/utility';
import { TREE_CATEGORY } from 'src/app/types';
import { StateService } from 'src/app/core';
import { CustomerEstimateService } from '../_core';
import { CustomerSiteService } from '../../customer-site/_core';

interface IChartData {
  item: string;
  amount: any;
  quantity: any;
  color: any;
  description: string;
}
@Component({
  selector: 'app-customer-estimate-detail',
  templateUrl: './customer-estimate-detail.component.html',
  styleUrls: ['./customer-estimate-detail.component.css'],
})
export class CustomerEstimateDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  private _assetChart: am4charts.PieChart3D;
  private _serviceChart: am4charts.PieChart3D;
  private _otherServiceChart: am4charts.PieChart3D;
  private _stop$: Subject<any>;
  private _overlayRef: OverlayRef;

  estimateId: any;
  estimate: any;
  services: any[];
  otherServices: any[];
  assets: any[];
  site: any;
  assetServices: any[];

  pdfPath: string;
  curBigImgUrl: any;
  totalTreeCount: number;
  completedTreeCount: number;
  treeCategory: TREE_CATEGORY;

  assetScrollItemPx = 360;
  assetScrollItemMaxBuffPx = 600;
  assetScrollItemMinBuffPx = 400;

  @ViewChild('treeMap', { static: false }) treeMap: TreeMapComponent;
  @ViewChild('treeImgPortal', { static: false }) treeImgPortal: CdkPortal;
  @ViewChild('pdfPortal', { static: false }) pdfPortal: CdkPortal;

  constructor(
    private readonly _zone: NgZone,
    private readonly _cdRef: ChangeDetectorRef,
    private readonly _overlay: Overlay,
    private readonly _route: ActivatedRoute,
    private readonly _globalStore: StateService,
    private readonly _estimateService: CustomerEstimateService,
    private readonly _siteService: CustomerSiteService
  ) {
    this.setVariables();
  }

  ngOnInit(): void {
    this._globalStore.treeImg
      .pipe(
        filter((img) => !isEmpty(img)),
        takeUntil(this._stop$)
      )
      .subscribe((img) => {
        this.onShowTreeFullImg(img);
      });

    this.setRouteEventListener();
  }

  ngAfterViewInit(): void {
    this._zone.runOutsideAngular(() => {
      if (!this.estimateId) return;

      this.getEstimate().subscribe(([estimate, summaries, assetServices]) => {
        const assetChart = am4core.create('asset-chart', am4charts.PieChart3D);
        const assets: IChartData[] = this.getAssetChartData(summaries);
        assetChart.data = assets.map((el) => ({ ...el, color: am4core.color(el.color) }));
        const assetChartSeries = assetChart.series.push(new am4charts.PieSeries3D());
        assetChartSeries.dataFields.category = 'item';
        assetChartSeries.dataFields.value = 'quantity';
        assetChartSeries.slices.template.propertyFields.fill = 'color';
        assetChartSeries.labels.template.disabled = true;
        assetChartSeries.ticks.template.disabled = true;
        this._assetChart = assetChart;

        const serviceChart = am4core.create('service-chart', am4charts.PieChart3D);
        const services: IChartData[] = this.getServiceChartData(assetServices);
        const serviceChartData = services?.map((service) => ({
          ...service,
          color: am4core.color(this.getServicePinColor(service.color)),
        }));
        serviceChart.data = serviceChartData;
        const serviceChartSeries = serviceChart.series.push(new am4charts.PieSeries3D());
        serviceChartSeries.dataFields.category = 'item';
        serviceChartSeries.dataFields.value = 'quantity';
        serviceChartSeries.slices.template.propertyFields.fill = 'color';
        serviceChartSeries.labels.template.disabled = true;
        serviceChartSeries.ticks.template.disabled = true;
        this._serviceChart = serviceChart;

        const otherServiceChart = am4core.create('other-service-chart', am4charts.PieChart3D);
        const otherServices: IChartData[] = this.getOtherServiceChartData(estimate.Mischellaneous_Items);
        const otherServiceChartData = otherServices?.map((service) => ({
          ...service,
          color: am4core.color(this.getServicePinColor(service.color)),
        }));
        otherServiceChart.data = otherServiceChartData;
        const otherServiceChartSeries = otherServiceChart.series.push(new am4charts.PieSeries3D());
        otherServiceChartSeries.dataFields.category = 'item';
        otherServiceChartSeries.dataFields.value = 'quantity';
        otherServiceChartSeries.slices.template.propertyFields.fill = 'color';
        otherServiceChartSeries.labels.template.disabled = true;
        otherServiceChartSeries.ticks.template.disabled = true;
        this._otherServiceChart = otherServiceChart;

        this.setEstimate(estimate, assets, services, otherServices);
      });
    });
  }

  ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();

    this._zone.runOutsideAngular(() => {
      this._assetChart?.dispose();
      this._serviceChart?.dispose();
      this._otherServiceChart?.dispose();
    });
  }

  setVariables() {
    this.treeCategory = TREE_CATEGORY.ESTIMATE;
    this._stop$ = new Subject();
    this.totalTreeCount = 0;
    this.completedTreeCount = 0;
  }

  setRouteEventListener() {
    this._route.paramMap
      .pipe(
        map((params) => params.get('id')),
        tap((id) => (this.estimateId = id))
      )
      .subscribe(() => {});
  }

  getEstimate() {
    return forkJoin([
      this._estimateService.getEstimateById(this.estimateId),
      this._estimateService.getEstimateSummaryById(this.estimateId),
      this._estimateService.getEstimateAssetServices(this.estimateId),
    ]).pipe(takeUntil(this._stop$));
  }

  getSite(id) {
    this._siteService
      .getSiteById(id)
      .pipe(takeUntil(this._stop$))
      .subscribe((site) => (this.site = site));
  }

  setEstimate(estimate, assets, services, otherServices) {
    this._zone.run(() => {
      this.estimate = estimate;
      this.assets = assets;
      this.services = services;
      this.otherServices = otherServices;
      this.totalTreeCount = this.estimate?.Assets.length;
      this.completedTreeCount = this.estimate?.Assets.filter((asset) => asset.Completed).length;
      this._cdRef.detectChanges();

      if (this.estimate?.Site_ID) {
        this.getSite(this.estimate.Site_ID);
      }
    });
  }

  onApprove(_ignore) {
    this._assetChart?.dispose();
    this._serviceChart?.dispose();
    this._otherServiceChart?.dispose();
    this.ngAfterViewInit();
  }

  onShowTreesTab() {
    setTimeout(() => {
      this.treeMap.setMapBounds();
    });
  }

  onLocateTreeInMap(tree) {
    this.treeMap.showSpecificTree(tree);
  }

  onShowTreeFullImg(img) {
    this.curBigImgUrl = img.fullUrl;
    this._overlayRef = this.getOverlayRef('900px', '600px');
    this._overlayRef.backdropClick().subscribe(() => {
      this._overlayRef.dispose();
    });

    this._overlayRef.attach(this.treeImgPortal);
  }

  onLoadImgFail(): void {
    setTimeout(() => {
      this._overlayRef.detach();
    }, 400);
    utility.dangerMsg('Image does not exist.');
  }

  onDownloadPdf(): void {
    this.pdfPath = this.estimate?.PDF_Path;
    if (!this.pdfPath) {
      utility.dangerMsg('PDF does not exist.');
      return;
    }

    this._overlayRef = this.getPdfOverlayRef('870px', '900px');
    this._overlayRef.backdropClick().subscribe(() => {
      this._overlayRef.dispose();
    });
    this._overlayRef.attach(this.pdfPortal);
  }

  getAssetChartData(data: any[]): IChartData[] {
    const chartData: IChartData[] = data.map((el) => ({
      item: el.Item,
      amount: el.Amount,
      quantity: el.Quantity,
      color: el.Color,
      description: '',
      data: el.Services,
    }));
    return chartData;
  }

  getServiceChartData(data: any[]): IChartData[] {
    const chartData: IChartData[] = data.map((el) => ({
      item: el.Treatment,
      amount: el.Amount_Total,
      quantity: el.Treatment_Count,
      description: el.Description,
      color: this.getRandomColor(),
      data: el.Assets,
    }));
    return chartData;
  }

  getOtherServiceChartData(data: any[]): IChartData[] {
    const chartData: IChartData[] = data.map((el) => ({
      item: el.Estimate_Miscellaneous_Item,
      amount: el.Amount,
      totalAmount: el.Amount * el.Quantity,
      quantity: el.Quantity,
      description: el.Estimate_Description,
      color: this.getRandomColor(),
    }));
    return chartData;
  }

  getOverlayRef(height: string, width: string) {
    const positionStrategy = this._overlay.position().global().centerHorizontally().centerVertically();

    const overlayConfig = new OverlayConfig({
      positionStrategy,
    });
    overlayConfig.hasBackdrop = true;

    const overlayRef = this._overlay.create(overlayConfig);
    return overlayRef;
  }

  getPdfOverlayRef(height: string, width: string) {
    const positionStrategy = this._overlay.position().global().centerHorizontally().centerVertically();

    const overlayConfig = new OverlayConfig({
      height,
      width,
      positionStrategy,
    });
    overlayConfig.hasBackdrop = true;

    const overlayRef = this._overlay.create(overlayConfig);
    return overlayRef;
  }

  getRandomColor() {
    return utility.getColor(`#${utility.getRandomNum(9)}${utility.getRandomNum(9)}${utility.getRandomNum(9)}`);
  }

  getServicePinColor(color) {
    return 'rgb(' + color.join(', ') + ')';
  }

  trackByFn(_ignore: any, asset: any) {
    return asset.Asset_ID;
  }

  public get treeCompletedPercent(): number {
    const percent = this.completedTreeCount / this.totalTreeCount;
    return Number.isNaN(percent) ? 0 : percent * 100;
  }
}
