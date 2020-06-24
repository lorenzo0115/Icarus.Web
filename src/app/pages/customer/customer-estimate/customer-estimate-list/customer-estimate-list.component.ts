import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Subject } from 'rxjs/Subject';
import { startWith, debounceTime, takeUntil, tap, mergeMap } from 'rxjs/operators';

import { CustomerEstimateService } from '../_core';

@Component({
  selector: 'app-customer-estimate-list',
  templateUrl: './customer-estimate-list.component.html',
  styleUrls: ['./customer-estimate-list.component.css'],
})
export class CustomerEstimateListComponent implements OnInit, OnDestroy {
  private _stop$: Subject<any>;

  estimates: any[];
  filteredEstimates: any[];
  estStatuses: any[];
  estCdkItemSize: number;
  estCdkItemMaxBuffPx: number;
  estCdkItemMinBuffPx: number;

  searchForm: FormGroup;

  isMobile: boolean;
  isLoading: boolean;

  constructor(private readonly _fb: FormBuilder, private readonly _estimateService: CustomerEstimateService) {
    this.setVariables();
    this.setSearchForm();
  }

  ngOnInit(): void {
    this.getEstimates();
  }

  ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }

  setVariables(): void {
    this._stop$ = new Subject();
    this.estCdkItemSize = 240;
    this.estCdkItemMaxBuffPx = 600;
    this.estCdkItemMinBuffPx = 400;
    this.isMobile = false;
    this.isLoading = false;
  }

  setSearchForm(): void {
    this.searchForm = this._fb.group({
      key: [''],
    });

    this.setSearchFormEventListener();
  }

  setSearchFormEventListener(): void {
    this.searchForm
      .get('key')
      .valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        tap((key) => {
          this.filteredEstimates = [...(this.estimates ?? [])].filter((estimate) =>
            estimate.Name.toLowerCase().includes(key.toLowerCase())
          );
        }),
        takeUntil(this._stop$)
      )
      .subscribe(() => {});
  }

  getEstimates(): void {
    this.isLoading = true;
    this._estimateService
      .getEstimateSummary()
      .pipe(
        tap((status) => (this.estStatuses = status)),
        mergeMap((status) => this._estimateService.getEstimateByStatus(status[0].Estimate_Status)),
        takeUntil(this._stop$)
      )
      .subscribe((est) => {
        this.isLoading = false;
        this.estimates = est;
        this.filteredEstimates = JSON.parse(JSON.stringify(this.estimates));
      });
  }

  onChangeStatus({ Estimate_Status_Count: count, Estimate_Status: status }) {
    if (!count) return;

    this.isLoading = true;
    this._estimateService
      .getEstimateByStatus(status)
      .pipe(takeUntil(this._stop$))
      .subscribe((estimates) => {
        this.isLoading = false;
        this.estimates = estimates;
        this.filteredEstimates = JSON.parse(JSON.stringify(this.estimates));
        const prevSearchKey = this.searchForm.get('key').value;
        this.searchForm.get('key').setValue(prevSearchKey);
      });
  }

  public get totalCount(): number {
    if (!this.estStatuses) return 0;

    return this.estStatuses.reduce((acc, cur) => acc + cur.Estimate_Status_Count ?? 0, 0);
  }
}
