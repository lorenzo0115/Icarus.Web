import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-site-header',
  templateUrl: './customer-site-header.component.html',
  styleUrls: ['./customer-site-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerSiteHeaderComponent implements OnInit, OnChanges {
  @Input() site: any;
  @Input() treeCount: number;

  constructor(private readonly _router: Router, private readonly _cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['site'] || changes['treeCount']) {
      this._cdRef.detectChanges();
    }
  }

  onGoBack(): void {
    this._router.navigateByUrl('/customer/site');
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
