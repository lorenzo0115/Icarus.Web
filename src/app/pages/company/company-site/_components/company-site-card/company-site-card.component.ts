import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';

import { CompanySiteStateService } from '../../_core';

@Component({
  selector: 'app-company-site-card',
  templateUrl: './company-site-card.component.html',
  styleUrls: ['./company-site-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanySiteCardComponent implements OnInit, OnChanges {
  @Input() site: any;

  constructor(
    private readonly _cdRef: ChangeDetectorRef,
    private readonly _router: Router,
    private readonly _siteStore: CompanySiteStateService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['site'] && changes['site'].previousValue !== changes['site'].currentValue) {
      this._cdRef.detectChanges();
    }
  }

  onMouseEnter(): void {
    this._siteStore.setMouseOverSite(this.site);
  }

  onMouseLeave(): void {
    this._siteStore.setMouseLeaveSite(this.site);
  }

  onHighlightSite(): void {
    this._siteStore.setFocusedSite(this.site);
  }

  onViewAsset(): void {}

  onViewEstimate(): void {}
}
