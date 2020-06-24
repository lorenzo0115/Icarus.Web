import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MapService } from 'src/app/core';

@Component({
  selector: 'app-customer-site-card',
  templateUrl: './customer-site-card.component.html',
  styleUrls: ['./customer-site-card.component.css'],
})
export class CustomerSiteCardComponent implements OnInit {
  @Input() site: any;

  constructor(private readonly _router: Router, private readonly _mapService: MapService) {
    this.setVariables();
  }

  ngOnInit(): void {}

  setVariables() {}

  onSpecifySite() {
    this._mapService.setFocusedSite(this.site);
  }

  onMouseEnter() {
    this._mapService.setMouseEnteredSite(this.site);
  }

  onMouseLeave() {
    this._mapService.setMouseLeftSite(this.site);
  }

  onViewAsset() {
    const { Site_ID: siteId } = this.site;
    if (!siteId) return;
    this._router.navigateByUrl(`/customer/site/${siteId}/asset`);
  }

  onViewEstimate() {
    const { Site_ID: siteId } = this.site;
    if (!siteId) return;
    this._router.navigateByUrl(`/customer/site/${siteId}/estimate`);
  }
}
