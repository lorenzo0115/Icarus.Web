import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import * as moment from 'moment';

interface TableElement {
  date: any;
  treatment: any;
  description: any;
  estimateCode: any;
  estimateId: any;
}

@Component({
  selector: 'app-site-tree-service-table',
  templateUrl: './site-tree-service-table.component.html',
  styleUrls: ['./site-tree-service-table.component.css'],
})
export class SiteTreeServiceTableComponent implements OnInit, OnChanges {
  displayedColumns: string[];
  dataSource = new MatTableDataSource<TableElement>([]);

  pageIndex: number;
  paginationSize: number;
  paginationOpts: number[];

  @Input() services: any[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private readonly router: Router) {
    this.setVariables();
  }

  ngOnInit(): void {
    this.setTableData();
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Boolean(changes['services']) && changes['services'].previousValue !== changes['services'].currentValue) {
      this.setTableData();
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 100);
    }
  }

  setVariables(): void {
    this.pageIndex = 0;
    this.paginationSize = 3;
    this.paginationOpts = [3, 6, 9];
    this.displayedColumns = ['date', 'treatment', 'estimate'];
  }

  setTableData(): void {
    const tableData: TableElement[] = [...(this.services ?? [])].map((el) => ({
      date: el.Service_Status_Date ? moment(el.Service_Status_Date).local().format('MM-DD-YYYY') : 'unknown',
      treatment: el.Treatment || '',
      description: el.Description || '',
      estimateCode: el.EstimateCode || '',
      estimateId: el.Estimate_ID || '',
    }));
    this.dataSource.data = tableData;
  }

  onViewEstimate(event, service): void {
    event.preventDefault();
    const { estimateId } = service;
    if (!estimateId) return;
    window.open(`/estimate/${estimateId}`);
    //this.router.navigateByUrl(`/estimate/${estimateId}`);
  }
}
