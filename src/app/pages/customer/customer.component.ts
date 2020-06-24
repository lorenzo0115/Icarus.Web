import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { CommonService } from 'src/app/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit, OnDestroy {
  private _stop$: Subject<any>;

  constructor(private readonly _commonService: CommonService) {
    this._stop$ = new Subject();
  }

  ngOnInit(): void {
    this.getTreeData();
  }

  ngOnDestroy(): void {
    this._stop$.next();
    this._stop$.complete();
  }

  getTreeData() {
    forkJoin([this._commonService.getTreeRating(), this._commonService.getDiameterHeight()])
      .pipe(takeUntil(this._stop$))
      .subscribe(() => {});
  }
}
