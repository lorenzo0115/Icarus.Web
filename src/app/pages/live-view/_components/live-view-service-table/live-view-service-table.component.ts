import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface IServiceTableElement {
  service: string;
  amount: any;
  count: number;
}

@Component({
  selector: 'app-live-view-service-table',
  templateUrl: './live-view-service-table.component.html',
  styleUrls: ['./live-view-service-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveViewServiceTableComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['service', 'amount', 'count'];
  dataSource = new MatTableDataSource<IServiceTableElement>([]);

  @Input() services;

  constructor() {}

  ngOnInit(): void {
    this.setTableData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['services'] && changes['services'].previousValue !== changes['services'].currentValue) {
      this.setTableData();
    }
  }

  setTableData(): void {
    const tableData: IServiceTableElement[] = [...(this.services ?? [])].map((service) => ({
      service: service.service,
      amount: service.amount,
      count: service.count,
    }));
    const totalAmount = tableData.reduce((acc, cur) => acc + cur.amount, 0);
    const totalCount = tableData.reduce((acc, cur) => acc + cur.count, 0);
    tableData.push({ service: 'Total', amount: totalAmount, count: totalCount });

    this.dataSource.data = tableData;
  }
}
