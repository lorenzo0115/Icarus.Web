import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-estimate-site-header',
  templateUrl: './customer-estimate-site-header.component.html',
  styleUrls: ['./customer-estimate-site-header.component.css'],
})
export class CustomerEstimateSiteHeaderComponent implements OnInit {
  @Input() site: any;
  @Input() treeCount: any;

  constructor(private readonly _router: Router) {}

  ngOnInit(): void {}

  onViewSite(event) {
    event.preventDefault();
    this._router.navigateByUrl(`site/asset/${this.site.Site_ID}`);
  }

  public get name(): string {
    if (!this.site) return '';

    const { Site, SiteID } = this.site;
    return `${Site} - (${SiteID})`;
  }

  public get address(): string {
    if (!this.site) return '';

    const {
      Street: street = '',
      City: city = '',
      Abbr: abbr = '',
      Zipcode: zipCode = '',
      County: county = '',
    } = this.site;
    return `${street ?? ''}, ${city ?? ''}, ${abbr ?? ''}, ${zipCode ?? ''}, ${county ?? ''}`;
  }
}
