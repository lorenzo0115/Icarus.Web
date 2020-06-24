import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-live-view-site-header',
  templateUrl: './live-view-site-header.component.html',
  styleUrls: ['./live-view-site-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveViewSiteHeaderComponent implements OnInit, OnChanges {
  @Input() site: any;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(): void {}

  onViewSite(event): void {
    event.preventDefault();
    // this.router.navigateByUrl(`/login`);
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
