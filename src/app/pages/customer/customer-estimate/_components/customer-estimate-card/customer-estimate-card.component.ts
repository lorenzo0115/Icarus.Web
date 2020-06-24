import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-estimate-card',
  templateUrl: './customer-estimate-card.component.html',
  styleUrls: ['./customer-estimate-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerEstimateCardComponent implements OnInit, OnChanges {
  @Input() estimate: any;

  constructor(private readonly _cdRef: ChangeDetectorRef, private readonly _router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['estimate'] && changes['estimate'].previousValue !== changes['estimate'].currentValue) {
      this._cdRef.detectChanges();
    }
  }

  onView(): void {
    const { Estimate_ID: id } = this.estimate;
    this._router.navigateByUrl(`/customer/estimate/${id}`);
  }
}
