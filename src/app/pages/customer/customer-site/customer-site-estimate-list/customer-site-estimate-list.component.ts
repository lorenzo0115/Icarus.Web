import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { CustomerSiteService } from '../_core';

@Component({
  selector: 'app-customer-site-estimate-list',
  templateUrl: './customer-site-estimate-list.component.html',
  styleUrls: ['./customer-site-estimate-list.component.css'],
})
export class CustomerSiteEstimateListComponent implements OnInit, OnDestroy {
  private _stop$: Subject<any>;

  site: any;
  siteId: any;
  estimates: any[];
  estimateStatus: any[];

  estimateItemSize: number;
  estimateItemMaxBuffPx: number;
  estimateItemMinBuffPx: number;

  isLoading: boolean;

  constructor(private readonly _route: ActivatedRoute, private readonly _siteService: CustomerSiteService) {
    this.setVariables();
  }

  ngOnInit(): void {
    this.setRouteEventListener();
  }

  ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }

  setVariables() {
    this.estimates = [];
    this.estimateStatus = [];
    this.estimateItemSize = 210;
    this.estimateItemMaxBuffPx = 600;
    this.estimateItemMinBuffPx = 400;
    this._stop$ = new Subject();
    this.isLoading = false;
  }

  setRouteEventListener() {
    this._route.paramMap
      .pipe(
        tap((params) => {
          const id = params.get('id');
          if (id) {
            this.siteId = id;
            this.getSiteData(id);
          }
        })
      )
      .subscribe(() => {});
  }

  getSiteData(id) {
    this.isLoading = true;
    forkJoin([
      this._siteService.getSiteById(id).pipe(tap((res) => (this.site = res))),
      this._siteService.getSiteEstimates(id).pipe(tap((res) => (this.estimateStatus = res))),
    ])
      .pipe(
        map(() => {
          this.getSiteEstimateByStatus(this.estimateStatus[0].Estimate_Status);
        }),
        takeUntil(this._stop$)
      )
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  getSiteEstimateByStatus(status: string) {
    this._siteService
      .getSiteEstimatesByStatus(this.siteId, status)
      .pipe(
        tap((res) => {
          this.isLoading = false;
          this.estimates = res;
        })
      )
      .subscribe(() => {});
  }

  onChangeEstimateStatus(status) {
    if (!status || !status.Estimate_Status_Count) return;

    this.isLoading = true;
    this.estimates = [];
    this.getSiteEstimateByStatus(status.Estimate_Status);
  }
}
