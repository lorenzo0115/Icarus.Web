import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Inject,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { map } from 'rxjs/operators/map';

import * as moment from 'moment';

import { utility } from 'src/app/utility';
import { CustomerEstimateService } from '../../_core';

export interface ITermsDialogData {
  terms: string;
}

@Component({
  selector: 'app-estimate-terms-dialog',
  templateUrl: '../../../../../component/dialog/estimate-terms-dialog.html',
})
export class EstimateTermsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EstimateTermsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITermsDialogData
  ) {}

  onClickYes(): void {
    this.dialogRef.close(true);
  }

  onClickNo(): void {
    this.dialogRef.close(false);
  }
}

@Component({
  selector: 'app-customer-estimate-header',
  templateUrl: './customer-estimate-header.component.html',
  styleUrls: ['./customer-estimate-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerEstimateHeaderComponent implements OnInit, OnChanges {
  @Input() estimate: any;
  @Output() approve: EventEmitter<any>;

  constructor(
    private readonly _router: Router,
    private readonly _cdRef: ChangeDetectorRef,
    private readonly _estimateService: CustomerEstimateService,
    public dialog: MatDialog
  ) {
    this.setVariables();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['estimate'] && changes['estimate'].previousValue !== changes['estimate'].currentValue) {
      this._cdRef.detectChanges();
    }
  }

  setVariables(): void {
    this.approve = new EventEmitter();
  }

  onApproveEstimate() {
    const { Company_ID: companyId, Estimate_ID: estimateId } = this.estimate;

    this._estimateService
      .getEstimateTermsAndConditions(companyId, estimateId)
      .pipe(map((terms) => terms.Terms_And_Conditions))
      .subscribe((terms) => {
        this.showTermsDialog(terms);
      });
  }

  onGoBack() {
    this._router.navigateByUrl('/estimate');
  }

  showTermsDialog(terms): void {
    const dialogRef = this.dialog.open(EstimateTermsDialogComponent, {
      width: '720px',
      data: { terms },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      const { Company_ID: companyId, Estimate_ID: estimateId } = this.estimate;
      this._estimateService.approveEstimate(companyId, estimateId).subscribe((res) => {
        utility.successMsg('Approve success');
        this.approve.emit();
      });
    });
  }

  public get approveTitle(): string {
    if (!Boolean(this.estimate)) {
      return '';
    }

    const { Approved_By = '', Approved_On = '', Approved_On_Account_Of = '' } = this.estimate;
    const timeValue = moment(Approved_On).format('MM/DD/YYYY');
    return Approved_On_Account_Of
      ? `Approved ${timeValue} by ${Approved_By} On Account Of ${Approved_On_Account_Of}`
      : `Approved ${timeValue} by ${Approved_By}`;
  }

  public get totalCost(): any {
    if (!this.estimate) return 0;

    const { Assets: assets, Mischellaneous_Items: misItems } = this.estimate;
    const assetSum = assets.reduce((acc, cur) => {
      const temp = cur.Services.reduce((serviceAcc, serviceCur) => serviceAcc + serviceCur.Amount, 0);
      return acc + temp;
    }, 0);
    const misSum = misItems.reduce((acc, cur) => acc + cur.Total_Amount, 0);
    return assetSum + misSum;
  }
}
