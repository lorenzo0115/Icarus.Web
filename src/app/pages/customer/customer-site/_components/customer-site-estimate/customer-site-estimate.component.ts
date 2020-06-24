import { Component, OnInit, OnChanges, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-site-estimate',
  templateUrl: './customer-site-estimate.component.html',
  styleUrls: ['./customer-site-estimate.component.css'],
})
export class CustomerSiteEstimateComponent implements OnInit, OnChanges {
  @Input() estimate: any;

  constructor(private readonly _cdRef: ChangeDetectorRef, private readonly _router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['estimate'] && changes['estimate'].previousValue !== changes['estimate'].currentValue) {
      this._cdRef.detectChanges();
    }
  }

  onView() {
    const estimateId = this.estimate.Estimate_ID;
    this._router.navigateByUrl(`/estimate/${estimateId}`);
  }
}
