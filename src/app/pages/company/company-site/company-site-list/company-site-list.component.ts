import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { debounceTime } from 'rxjs/operators/debounceTime';

import { CompanySiteService } from '../_core';

@Component({
  selector: 'app-company-site-list',
  templateUrl: './company-site-list.component.html',
  styleUrls: ['./company-site-list.component.css'],
})
export class CompanySiteListComponent implements OnInit, OnDestroy {
  private _stop$: Subject<any>;
  private _filterCbObj: any;

  sites: any[];
  filteredSites: any[];
  siteSearchForm: FormGroup;
  siteSearchOpts: any[];

  siteCdkItemSize: number;
  siteCdkMaxBuffPx: number;
  siteCdkMinBuffPx: number;

  constructor(
    private readonly _cdRef: ChangeDetectorRef,
    private readonly _fb: FormBuilder,
    private readonly _siteService: CompanySiteService
  ) {
    this.setVariables();
    this.setSiteSearchForm();
  }

  ngOnInit(): void {
    this.getCompanySites();
  }

  ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }

  setVariables(): void {
    this.siteCdkItemSize = 240;
    this.siteCdkMaxBuffPx = 600;
    this.siteCdkMinBuffPx = 400;
    this._stop$ = new Subject();
    this.siteSearchOpts = [
      { label: 'SiteID', value: 'siteId' },
      { label: 'Site', value: 'site' },
      { label: 'Client', value: 'client' },
      { label: 'Account Manager', value: 'manager' },
    ];
    this._filterCbObj = {
      siteId: (value) => {
        this.filteredSites = [...this.sites].filter(({ SiteID }) => SiteID === Number(value));
      },
      site: (value) => {
        this.filteredSites = [...this.sites].filter(({ Site }) => Site.toLowerCase().includes(value.toLowerCase()));
      },
      client: (value) => {
        this.filteredSites = [...this.sites].filter(({ Client_Name }) =>
          Client_Name.toLowerCase().includes(value.toLowerCase())
        );
      },
      manager: (value) => {
        this.filteredSites = [...this.sites].filter(({ Account_Manager }) =>
          Account_Manager.toLowerCase().includes(value.toLowerCase())
        );
      },
    };
  }

  setSiteSearchForm(): void {
    this.siteSearchForm = this._fb.group({
      category: ['', Validators.required],
      value: [''],
    });

    this.setSearchFormEventListener();
  }

  setSearchFormEventListener(): void {
    this.siteSearchForm.valueChanges
      .pipe(debounceTime(3 * 100), takeUntil(this._stop$))
      .subscribe(({ category: searchOpt, value: searchValue }) => {
        if (!searchOpt || !searchValue) {
          this.siteSearchForm.markAsTouched();
          this.siteSearchForm.updateValueAndValidity();
          return;
        }

        this.filterSite(searchOpt, searchValue);
      });
  }

  getCompanySites(): void {
    this._siteService
      .getSites()
      .pipe(takeUntil(this._stop$))
      .subscribe((sites: any[]) => {
        this.sites = sites;
        this.filteredSites = JSON.parse(JSON.stringify(this.sites));
      });
  }

  onAddSite(): void {
    console.log('on add site');
  }

  filterSite(opt, value) {
    this._filterCbObj[opt](value);
  }

  public get totalAssets(): number {
    return [...(this.sites ?? [])].reduce((acc, cur) => acc + cur?.Asset_Count || 0, 0);
  }
}
