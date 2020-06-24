import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { DashboardService } from '../../_core';

export interface ICurEstimateSummaryTableElement {
  index: number;
  name: string;
}

@Component({
  selector: 'app-current-estimate-summary',
  templateUrl: './current-estimate-summary.component.html',
  styleUrls: ['./current-estimate-summary.component.css'],
})
export class CurrentEstimateSummaryComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['EstimateCode', 'Name', 'Amount', 'Site', 'Status'];
  dataSource = new MatTableDataSource<ICurEstimateSummaryTableElement>([]);

  estimateSummary: any;

  @Input() companyId: string;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private readonly _router: Router, private readonly _dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getCurrentEstimateSummary();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['companyId'] && changes['companyId'].currentValue !== changes['companyId'].previousValue) {
      this.getCurrentEstimateSummary();
    }
  }

  getCurrentEstimateSummary() {
    if (!this.companyId) return;

    this._dashboardService.getCurrentEstimateSummary(this.companyId).subscribe((response) => {
      this.estimateSummary = response;
      this.dataSource.data = response;
    });
  }

  onGoToEstimate(event, estimate): void {
    event.preventDefault();

    if (!estimate.Estimate_ID) return;
    this._router.navigateByUrl(`/customer/estimate/${estimate.Estimate_ID}`);
  }

  onGoToSite(event, site): void {
    event.preventDefault();

    if (!site.SiteID) return;
    this._router.navigateByUrl(`customer/site/${site.Site_ID}/asset`);
  }
}
