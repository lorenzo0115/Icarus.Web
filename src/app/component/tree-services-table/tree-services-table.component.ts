import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface ServiceElement {
  date: any;
  treatment: string;
  amount: any;
  estimate: any;
  description: string;
}

@Component({
  selector: 'app-tree-services-table',
  templateUrl: './tree-services-table.component.html',
  styleUrls: ['./tree-services-table.component.css'],
})
export class TreeServicesTableComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['treatment', 'amount'];
  dataSource = new MatTableDataSource<ServiceElement>([]);

  @Input() services: any[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.setTableData();
  }

  ngOnChanges(): void {
    this.setTableData();
  }

  setTableData() {
    const tableData: ServiceElement[] = [...(this.services ?? [])].map((el) => ({
      date: el.Next_Service_Date || 'unknown',
      treatment: el.Treatment || '',
      amount: el.Amount || 0,
      estimate: el.EstimateCode || '',
      description: el.Description || '',
    }));
    this.dataSource.data = tableData;
  }

  public get paginate(): boolean {
    return Boolean(this.services) && this.services.length > 3;
  }
}
