import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, AfterViewInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { MatTooltip } from '@angular/material/tooltip';

import { Subject } from 'rxjs/Subject';
import { combineLatest } from 'rxjs/observable/combineLatest';
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

import { utility } from 'src/app/utility';
import { TREE_RATING } from 'src/app/types';
import { StateService } from 'src/app/core/services';
import { CustomerSiteService } from '../_core';
import { TreeMapComponent } from 'src/app/component/tree-map/tree-map.component';

declare var $: any;

@Component({
  selector: 'app-customer-site-asset-list',
  templateUrl: './customer-site-asset-list.component.html',
  styleUrls: ['./customer-site-asset-list.component.css'],
})
export class CustomerSiteAssetListComponent implements OnInit, AfterViewInit, OnDestroy {
  private _stop$: Subject<any>;
  private _overlayRef: OverlayRef;

  private _speciesChart: am4charts.PieChart;
  private _diameterChart: am4charts.PieChart;
  private _ratingChart: am4charts.PieChart;
  private _buildingChart: am4charts.PieChart;
  private _powerLineChart: am4charts.PieChart;
  private _damageChart: am4charts.PieChart;

  site: any;
  siteId: any;
  estimates: any[];
  estimateStatus: any[];

  treeRating: any;
  treeDiameter: any;
  trees: any[] = [];
  filteredTrees: any[] = [];

  curBigImgUrl: string;
  treeItemSize: number;
  treeItemMaxBufferPx: number;
  treeItemMinBufferPx: number;
  estimateItemSize: number;
  estimateItemMaxBufferPx: number;
  estimateItemMinBufferPx: number;

  isLoading: boolean;

  @ViewChild('treeMap', { static: false }) treeMap: TreeMapComponent;
  @ViewChild('treeImgPortal', { static: false }) treeImgPortal: CdkPortal;
  @ViewChild('treeTabTooltip', { static: false }) treeTabTooltip: MatTooltip;

  constructor(
    private readonly _zone: NgZone,
    private readonly _overlay: Overlay,
    private readonly _route: ActivatedRoute,
    private readonly _cdRef: ChangeDetectorRef,
    private readonly _globalStore: StateService,
    private readonly _siteService: CustomerSiteService
  ) {
    this.setVariables();
  }

  ngOnInit(): void {
    this.setRouteEventListener();

    combineLatest([
      this._globalStore.treeRating.pipe(tap((rating) => (this.treeRating = rating))),
      this._globalStore.diameterBreastHeight.pipe(tap((diameter) => (this.treeDiameter = diameter))),
    ])
      .pipe(takeUntil(this._stop$))
      .subscribe(() => {});

    this._globalStore.treeImg
      .pipe(
        filter((img) => !isEmpty(img)),
        takeUntil(this._stop$)
      )
      .subscribe((img) => {
        this.onViewFullImg(img);
      });
  }

  ngAfterViewInit(): void {
    this._zone.runOutsideAngular(() => {
      if (!this.siteId) return;

      forkJoin([
        this.getSiteAssets(this.siteId),
        this.getSiteEstimates(this.siteId),
        this._siteService.getSiteSpeciesSummary(this.siteId),
      ])
        .pipe(takeUntil(this._stop$))
        .subscribe(([[_ignore1, assets], _ignore2, species]) => {
          this.setTreeSpeciesChart(species);
          this.setTreeDamageChart(assets);
          this.setTreeDiameterChart(assets);
          this.setTreeRatingChart(assets);
          this.setTreeBuildingChart(assets);
          this.setTreePowerLineChart(assets);
        });
    });
  }

  ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();

    this._speciesChart?.dispose();
    this._diameterChart?.dispose();
    this._ratingChart?.dispose();
    this._buildingChart?.dispose();
    this._powerLineChart?.dispose();
    this._damageChart?.dispose();
  }

  setVariables() {
    this._stop$ = new Subject();
    this.treeItemSize = 550;
    this.treeItemMaxBufferPx = 1200;
    this.treeItemMinBufferPx = 1000;
    this.estimateItemSize = 240;
    this.estimateItemMaxBufferPx = 600;
    this.estimateItemMinBufferPx = 400;
    this.isLoading = false;
  }

  setRouteEventListener() {
    this._route.paramMap
      .pipe(
        tap((params) => {
          this.siteId = params.get('id');
        })
      )
      .subscribe(() => {});
  }

  getSiteAssets(id) {
    return combineLatest([
      this._siteService.getSiteById(id).pipe(tap((res) => (this.site = res))),
      this._siteService.getSiteTrees(id).pipe(
        tap((res) => {
          this.trees = res;
          this.filteredTrees = [];
        })
      ),
    ]);
  }

  getSiteEstimates(id) {
    return this._siteService.getSiteEstimates(id).pipe(
      tap((value) => (this.estimateStatus = value)),
      map(() => {
        const { Estimate_Status: status } = this.estimateStatus[0];
        this.getSiteEstimate(id, status);
      })
    );
  }

  getSiteEstimate(id, status) {
    this.isLoading = true;
    this._siteService
      .getSiteEstimatesByStatus(id, status)
      .pipe(
        tap((value) => {
          this.estimates = value;
        })
      )
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  setTreeSpeciesChart(species) {
    const speciesChart = am4core.create('species-chart', am4charts.PieChart);
    speciesChart.innerRadius = am4core.percent(40);
    speciesChart.data = species.map((specie) => ({
      name: specie.Common_Name,
      value: specie.Species_Count,
      color: am4core.color(specie.Color),
    }));
    const speciesChartSeries = speciesChart.series.push(new am4charts.PieSeries());
    speciesChartSeries.dataFields.category = 'name';
    speciesChartSeries.dataFields.value = 'value';
    speciesChartSeries.slices.template.propertyFields.fill = 'color';
    speciesChartSeries.labels.template.disabled = true;
    speciesChartSeries.ticks.template.disabled = true;

    speciesChart.legend = new am4charts.Legend();
    this._speciesChart = speciesChart;
  }

  setTreeDamageChart(trees) {
    const data = new Array(3)
      .fill(1)
      .map((_, index) => index)
      .reduce((acc, cur) => {
        const assets = trees.filter((tree) => tree.HardscapeDamageTypeID === cur + 1);
        switch (cur) {
          case 0:
            Object.assign(acc, { none: assets });
            break;
          case 1:
            Object.assign(acc, { damage: assets });
            break;
          case 2:
            Object.assign(acc, { potential: assets });
            break;
          default:
            break;
        }
        return acc;
      }, {});

    const damageChart = am4core.create('damage-chart', am4charts.PieChart);
    damageChart.innerRadius = am4core.percent(40);
    damageChart.data = Object.keys(data)
      .filter((key) => data[key].length > 0)
      .map((key) => {
        const name =
          key === 'none' ? 'No Hardscape Damage' : key === 'damage' ? 'Damage' : 'Potential Hard Scape Damage';
        return {
          name,
          value: data[key].length,
          color: am4core.color(this.getChartColor(this.getRandomColor())),
        };
      });
    const damageChartSeries = damageChart.series.push(new am4charts.PieSeries());
    damageChartSeries.dataFields.category = 'name';
    damageChartSeries.dataFields.value = 'value';
    damageChartSeries.slices.template.propertyFields.fill = 'color';
    damageChartSeries.labels.template.disabled = true;
    damageChartSeries.ticks.template.disabled = true;

    damageChart.legend = new am4charts.Legend();
    this._damageChart = damageChart;
  }

  setTreeDiameterChart(trees) {
    if (!this.treeDiameter) return;

    const data = this.treeDiameter.reduce((acc, cur) => {
      const assets = trees.filter((tree) => tree.DiameterBreastHeightID === cur.Value);
      Object.assign(acc, { [cur.Text]: assets });
      return acc;
    }, {});

    const diameterChart = am4core.create('diameter-chart', am4charts.PieChart);
    diameterChart.innerRadius = am4core.percent(40);
    diameterChart.data = Object.keys(data)
      .filter((key) => data[key].length > 0)
      .map((key) => {
        return {
          name: key,
          value: data[key].length,
          color: am4core.color(this.getChartColor(this.getRandomColor())),
        };
      });
    const diameterChartSeries = diameterChart.series.push(new am4charts.PieSeries());
    diameterChartSeries.dataFields.category = 'name';
    diameterChartSeries.dataFields.value = 'value';
    diameterChartSeries.slices.template.propertyFields.fill = 'color';
    diameterChartSeries.labels.template.disabled = true;
    diameterChartSeries.ticks.template.disabled = true;

    diameterChart.legend = new am4charts.Legend();
    this._diameterChart = diameterChart;
  }

  setTreeRatingChart(trees) {
    if (!this.treeRating) return;

    const data = this.treeRating.reduce((acc, cur) => {
      const assets = trees.filter((tree) => tree.TreeRatingID === cur.Value);

      switch (cur.Text) {
        case TREE_RATING.GOOD:
          Object.assign(acc, { good: assets });
          break;
        case TREE_RATING.FAIR:
          Object.assign(acc, { fair: assets });
          break;
        case TREE_RATING.POOR:
          Object.assign(acc, { poor: assets });
          break;
        case TREE_RATING.DEAD:
          Object.assign(acc, { dead: assets });
          break;
        case TREE_RATING.VERY_POOR:
          Object.assign(acc, { veryPoor: assets });
          break;
        default:
          break;
      }

      return acc;
    }, {});

    const ratingChart = am4core.create('rating-chart', am4charts.PieChart);
    ratingChart.innerRadius = am4core.percent(40);
    ratingChart.data = Object.keys(data)
      .filter((key) => data[key].length > 0)
      .map((key) => {
        return {
          name: key,
          value: data[key].length,
          color: am4core.color(this.getChartColor(this.getRandomColor())),
        };
      });
    const ratingChartSeries = ratingChart.series.push(new am4charts.PieSeries());
    ratingChartSeries.dataFields.category = 'name';
    ratingChartSeries.dataFields.value = 'value';
    ratingChartSeries.slices.template.propertyFields.fill = 'color';
    ratingChartSeries.labels.template.disabled = true;
    ratingChartSeries.ticks.template.disabled = true;

    ratingChart.legend = new am4charts.Legend();
    this._ratingChart = ratingChart;
  }

  setTreeBuildingChart(trees) {
    const nearTrees = trees.filter((tree) => tree.Near_Building);
    const notNearTrees = trees.filter((tree) => !tree.Near_Building);

    const buildingChart = am4core.create('building-chart', am4charts.PieChart);
    buildingChart.innerRadius = am4core.percent(40);
    buildingChart.data = [
      {
        name: 'Near Building',
        value: nearTrees.length,
        color: am4core.color(this.getChartColor(this.getRandomColor())),
      },
      {
        name: 'Not Near Building',
        value: notNearTrees.length,
        color: am4core.color(this.getChartColor(this.getRandomColor())),
      },
    ];
    const buildingChartSeries = buildingChart.series.push(new am4charts.PieSeries());
    buildingChartSeries.dataFields.category = 'name';
    buildingChartSeries.dataFields.value = 'value';
    buildingChartSeries.slices.template.propertyFields.fill = 'color';
    buildingChartSeries.labels.template.disabled = true;
    buildingChartSeries.ticks.template.disabled = true;

    buildingChart.legend = new am4charts.Legend();
    this._buildingChart = buildingChart;
  }

  setTreePowerLineChart(trees) {
    const nearTrees = trees.filter((tree) => tree.Near_Powerline);
    const notNearTrees = trees.filter((tree) => !tree.Near_Powerline);

    const powerLineChart = am4core.create('powerLine-chart', am4charts.PieChart);
    powerLineChart.innerRadius = am4core.percent(40);
    powerLineChart.data = [
      {
        name: 'Near Power Line',
        value: nearTrees.length,
        color: am4core.color(this.getChartColor(this.getRandomColor())),
      },
      {
        name: 'Not Near Power Line',
        value: notNearTrees.length,
        color: am4core.color(this.getChartColor(this.getRandomColor())),
      },
    ];
    const powerLineChartSeries = powerLineChart.series.push(new am4charts.PieSeries());
    powerLineChartSeries.dataFields.category = 'name';
    powerLineChartSeries.dataFields.value = 'value';
    powerLineChartSeries.slices.template.propertyFields.fill = 'color';
    powerLineChartSeries.labels.template.disabled = true;
    powerLineChartSeries.ticks.template.disabled = true;

    powerLineChart.legend = new am4charts.Legend();
    this._powerLineChart = powerLineChart;
  }

  onChangeFilters(data: any) {
    // this.setTreeSpeciesChart(data.species);
    // this.setTreeDamageChart(data.trees);
    // this.setTreeDiameterChart(data.trees);
    // this.setTreeRatingChart(data.trees);
    // this.setTreeBuildingChart(data.trees);
    // this.setTreePowerLineChart(data.trees);

    this.filteredTrees = JSON.parse(JSON.stringify(data.trees));
    this._cdRef.detectChanges();
  }

  onChangeEstimateStatus(status) {
    this.estimates = [];
    const { Estimate_Status_Count: statusCount } = status;
    if (!statusCount) return;

    this.getSiteEstimate(this.siteId, status.Estimate_Status);
  }

  onLocateTreeInMap(tree) {
    this.treeMap.showSpecificTree(tree);
    $('#site-asset-tab li:first-child a').tab('show');
    this.treeTabTooltip.show();
    setTimeout(() => {
      this.treeTabTooltip.hide();
    }, 5 * 1000);
  }

  onViewFullImg(img) {
    this.curBigImgUrl = img.fullUrl;
    this._overlayRef = this.getOverlayRef('900px', '600px');
    this._overlayRef.backdropClick().subscribe(() => {
      this._overlayRef.dispose();
    });

    if (Boolean(this.treeImgPortal)) {
      this._overlayRef.attach(this.treeImgPortal);
    }
  }

  onLoadImgFail(): void {
    setTimeout(() => {
      this._overlayRef.detach();
    }, 400);
    utility.dangerMsg('Image does not exist.');
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

  getRandomColor() {
    return utility.getColor(`#${utility.getRandomNum(9)}${utility.getRandomNum(9)}${utility.getRandomNum(9)}`);
  }

  getChartColor(color) {
    return 'rgb(' + color.join(', ') + ')';
  }

  trackByTree(index, item) {
    return item.Asset_ID;
  }
}
