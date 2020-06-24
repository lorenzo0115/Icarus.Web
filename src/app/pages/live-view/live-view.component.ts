import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';

import { NgxSpinnerService } from 'ngx-spinner';

import { Subject } from 'rxjs/Subject';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { tap } from 'rxjs/operators/tap';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { filter } from 'rxjs/operators/filter';

import isEmpty from 'lodash/isEmpty';

import { utility } from 'src/app/utility';
import { TREE_CATEGORY } from 'src/app/types';
import { StateService } from 'src/app/core';
import { LiveViewService } from './_core';

import { TreeMapComponent } from 'src/app/component/tree-map/tree-map.component';

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.css'],
})
export class LiveViewComponent implements OnInit, OnDestroy {
  private stop$: Subject<any>;
  private overlayRef: OverlayRef;

  site: any;
  estimateCode: string;
  estimate: any;
  estimateSummary: any[];
  assets: any[];
  services: any[];
  otherServices: any[];
  curBigImgUrl: any;
  pdfPath: string;

  isRequestDone: boolean;
  isCodeInvalid: boolean;
  assetScrollItemPx = 360;
  assetScrollItemMaxBuffPx = 600;
  assetScrollItemMinBuffPx = 400;

  @ViewChild('treeMap', { static: false }) treeMap: TreeMapComponent;
  @ViewChild('treeImgPortal', { static: false }) treeImgPortal: CdkPortal;
  @ViewChild('pdfPortal', { static: false }) pdfPortal: CdkPortal;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _overlay: Overlay,
    private readonly _spinner: NgxSpinnerService,
    private readonly _globalStore: StateService,
    private readonly _liveViewService: LiveViewService
  ) {
    this.setVariables();
  }

  ngOnInit(): void {
    this._globalStore.treeImg
      .pipe(
        filter((img) => !isEmpty(img)),
        takeUntil(this.stop$)
      )
      .subscribe((img) => {
        this.onShowTreeFullImg(img);
      });
    this._globalStore.setTreeCategory(TREE_CATEGORY.ESTIMATE);
    this.setRouteEventListener();
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  setVariables(): void {
    this.stop$ = new Subject();
    this.assets = [];
    this.services = [];
    this.otherServices = [];
    this.isRequestDone = false;
    this.isCodeInvalid = false;
  }

  setRouteEventListener(): void {
    this._route.paramMap
      .pipe(
        tap((params) => {
          const code = params.get('code');
          this.estimateCode = code;

          if (Boolean(this.estimateCode)) {
            this.getData();
          }
        }),
        takeUntil(this.stop$)
      )
      .subscribe(() => {});
  }

  getData(): void {
    this._spinner.show();
    forkJoin([
      this._liveViewService.getLiveViewEstimate(this.estimateCode),
      this._liveViewService.getLiveViewEstimateSummary(this.estimateCode),
      this._liveViewService.getLiveViewSite(this.estimateCode),
      this._liveViewService.getLiveViewServices(this.estimateCode),
    ])
      .pipe(takeUntil(this.stop$))
      .subscribe(
        ([estimate, estimateSummary, site, services]) => {
          this.site = site;
          this.estimate = estimate;
          this.estimateSummary = estimateSummary;

          // call this for centering map
          this.recenterTreeMap();

          this.assets = this.getAssets(estimateSummary ?? []);
          this.services = this.getServices(services ?? []);
          this.otherServices = this.getOtherServices(estimate.Mischellaneous_Items ?? []);

          this._spinner.hide();
          this.isRequestDone = true;
          this.isCodeInvalid = false;
        },
        () => {
          this._spinner.hide();
          this.isRequestDone = true;
          this.isCodeInvalid = true;
          utility.dangerMsg('Invalid code provided.');
        }
      );
  }

  onLocateTreeInMap(tree) {
    this.treeMap.showSpecificTree(tree);
  }

  onShowTreeFullImg(img) {
    this.curBigImgUrl = img.fullUrl;
    this.overlayRef = this.getOverlayRef('900px', '600px');
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.dispose();
    });

    this.overlayRef.attach(this.treeImgPortal);
  }

  onLoadImgFail() {
    setTimeout(() => {
      this.overlayRef.detach();
    });
    utility.dangerMsg('Image not exit.');
  }

  onDownloadPdf() {
    this.pdfPath = this.estimate?.PDF_Path;
    if (!this.pdfPath) {
      utility.dangerMsg('PDF does not exist.');
      return;
    }

    this.overlayRef = this.getPdfOverlayRef('870px', '900px');
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.dispose();
    });
    this.overlayRef.attach(this.pdfPortal);
  }

  recenterTreeMap() {
    setTimeout(() => {
      this.treeMap.setMapBounds();
    });
  }

  getAssets(data: []) {
    return data.map((el: any) => ({
      item: el.Item,
      amount: el.Amount,
      quantity: el.Quantity,
      description: '',
      color: el.Color,
      services: el.Services.map((service) => ({
        service: service.Treatment,
        amount: service.Amount,
        count: service.Count,
      })),
    }));
  }

  getServices(data: []) {
    return data.map((el: any) => ({
      item: el.Treatment,
      amount: el.Amount_Total,
      quantity: el.Treatment_Count,
      description: el.Description,
      color: this.getPinColor(this.getRandomColor()),
      assets: el.Assets.map((asset) => ({
        asset: asset.Common_Name,
        amount: asset.Amount,
        count: asset.Count,
        color: asset.Color,
      })),
    }));
  }

  getOtherServices(data: []) {
    return data.map((el: any) => ({
      item: el.Estimate_Miscellaneous_Item,
      amount: el.Amount,
      quantity: el.Quantity,
      description: el.Estimate_Description,
      color: this.getPinColor(this.getRandomColor()),
    }));
  }

  getRandomColor() {
    return utility.getColor(`#${utility.getRandomNum(9)}${utility.getRandomNum(9)}${utility.getRandomNum(9)}`);
  }

  getPinColor(color) {
    return 'rgb(' + color.join(', ') + ')';
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

  trackByFn(_ignore: any, asset: any) {
    return asset.Asset_ID;
  }
}
