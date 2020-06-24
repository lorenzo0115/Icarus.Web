import { Component, OnInit, OnChanges, Input, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface IAssetTableElement {
  asset: string;
  amount: any;
  count: number;
}

@Component({
  selector: 'app-live-view-asset-table',
  templateUrl: './live-view-asset-table.component.html',
  styleUrls: ['./live-view-asset-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveViewAssetTableComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['asset', 'amount', 'count'];
  dataSource = new MatTableDataSource<IAssetTableElement>([]);

  @Input() assets;

  constructor() {}

  ngOnInit(): void {
    this.setTableData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['assets'] && changes['assets'].previousValue !== changes['assets'].currentValue) {
      this.setTableData();
    }
  }

  setTableData(): void {
    const tableData: IAssetTableElement[] = [...(this.assets ?? [])].map((asset) => ({
      asset: asset.asset,
      amount: asset.amount,
      count: asset.count,
    }));
    const totalAmount = tableData.reduce((acc, cur) => acc + cur.amount, 0);
    const totalCount = tableData.reduce((acc, cur) => acc + cur.count, 0);
    tableData.push({ asset: 'Total', amount: totalAmount, count: totalCount });

    this.dataSource.data = tableData;
  }
}
