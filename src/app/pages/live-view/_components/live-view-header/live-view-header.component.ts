import { Component, OnInit, ChangeDetectionStrategy, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { utility } from 'src/app/utility';
import { LiveViewService } from '../../_core';

export interface IDialogData {
  msg: string;
}

@Component({
  selector: 'app-approve-confirm-dialog',
  templateUrl: '../dialog/approve-confirm-dialog.html',
})
export class ApproveConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ApproveConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) {}

  onApprove(): void {
    this.dialogRef.close('approve');
  }

  onClose(): void {
    this.dialogRef.close('cancel');
  }
}

@Component({
  selector: 'app-live-view-header',
  templateUrl: './live-view-header.component.html',
  styleUrls: ['./live-view-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveViewHeaderComponent implements OnInit {
  @Input() code: any;
  @Input() estimate: any;

  constructor(private dialog: MatDialog, private readonly _liveViewService: LiveViewService) {}

  ngOnInit(): void {}

  onApproveEstimate(): void {
    this._liveViewService.getLiveViewTerms(this.code).subscribe((terms) => {
      const dialogRef = this.dialog.open(ApproveConfirmDialogComponent, {
        height: '800px',
        data: { msg: terms.Terms_And_Conditions },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'approve') this.approveEstimate();
      });
    });
  }

  approveEstimate(): void {
    this._liveViewService.approveLiveView(this.code).subscribe(
      () => {
        utility.successMsg('Approve estimate succeed.');
      },
      () => {
        utility.dangerMsg('Approve estimate failed.');
      }
    );
  }

  public get totalCost(): number {
    if (!this.estimate) return 0;
    const { Assets: assets, Mischellaneous_Items: items } = this.estimate;

    const assetTotal = [...(assets ?? [])].reduce((acc, cur) => {
      const temp = cur.Services.reduce((sAcc, sCur) => sAcc + sCur.Amount, 0);
      return acc + temp;
    }, 0);
    const itemTotal = [...(items ?? [])].reduce((acc, cur) => acc + cur.Quantity * cur.Amount, 0);
    return assetTotal + itemTotal;
  }
}
