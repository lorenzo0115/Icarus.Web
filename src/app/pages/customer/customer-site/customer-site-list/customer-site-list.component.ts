import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Subject } from 'rxjs/Subject';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { tap } from 'rxjs/operators/tap';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { startWith } from 'rxjs/operators/startWith';
import { debounceTime } from 'rxjs/operators/debounceTime';

import { CustomerSiteService } from '../_core';
import { ClientTreeNodeComponent } from 'src/app/component/client-tree-node/client-tree-node.component';

@Component({
  selector: 'app-customer-site-list',
  templateUrl: './customer-site-list.component.html',
  styleUrls: ['./customer-site-list.component.css'],
})
export class CustomerSiteListComponent implements OnInit, OnDestroy {
  private _stop$: Subject<any>;

  sites: any[];
  filteredSites: any[];
  clientList: any[];
  clientItemSize: number;
  clientItemMaxBuffPx: number;
  clientItemMinBuffPx: number;

  siteSearchForm: FormGroup;
  isLoading: boolean;

  @ViewChild('treeNode', { static: false }) treeNode: ClientTreeNodeComponent;

  constructor(private readonly _fb: FormBuilder, private readonly _siteService: CustomerSiteService) {
    this.setVariables();
    this.setSiteSearchForm();
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy() {
    this._stop$.next();
    this._stop$.complete();
  }

  setVariables() {
    this._stop$ = new Subject();
    this.sites = [];
    this.filteredSites = [];
    this.clientList = [];
    this.clientItemSize = 270;
    this.clientItemMaxBuffPx = 600;
    this.clientItemMinBuffPx = 400;
    this.isLoading = false;
  }

  setSiteSearchForm() {
    this.siteSearchForm = this._fb.group({
      siteName: [''],
    });

    this.setSiteSearchFormEventListener();
  }

  setSiteSearchFormEventListener() {
    this.siteSearchForm
      .get('siteName')
      .valueChanges.pipe(
        startWith(''),
        debounceTime(400),
        tap((res) => this.filterSite(res)),
        takeUntil(this._stop$)
      )
      .subscribe(() => {});
  }

  getData() {
    this.isLoading = true;
    forkJoin([this.getCompanyClientsList(), this.getSites()])
      .pipe(takeUntil(this._stop$))
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  getCompanyClientsList() {
    return this._siteService.getClients().pipe(
      tap(({ Companies }) => {
        this.clientList = Companies;
        this.treeNode.setTreeData(this.clientList);
      }),
      takeUntil(this._stop$)
    );
  }

  getSites() {
    return this._siteService.getSites().pipe(
      tap((res) => {
        this.sites = JSON.parse(JSON.stringify(res));
        this.filteredSites = JSON.parse(JSON.stringify(res));
      }),
      takeUntil(this._stop$)
    );
  }

  onSelectClient(client) {
    this.isLoading = true;
    this._siteService
      .getSiteByCompanyAndClient(client.companyId, client.id)
      .pipe(
        tap((res) => {
          this.sites = res;
          this.filteredSites = JSON.parse(JSON.stringify(this.sites));
          const prevKey = this.siteSearchForm.get('siteName').value;
          this.siteSearchForm.get('siteName').setValue(prevKey);
        }),
        takeUntil(this._stop$)
      )
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  filterSite(name) {
    this.filteredSites = this.sites.filter((site) => site.Site.toLowerCase().includes(name.toLowerCase()));
  }

  public get totalAssetCount(): number {
    if (!this.sites) return 0;

    return this.sites?.reduce((acc, site) => acc + site.Asset_Count, 0);
  }
}
