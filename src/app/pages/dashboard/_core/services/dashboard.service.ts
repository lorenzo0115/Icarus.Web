import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators/map';

import { ApiService } from 'src/app/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private readonly _api: ApiService) {}

  getCurrentEstimateSummary(companyId) {
    return this._api.get(`/Customer/CurrentEstimateSummary?Company_ID=${companyId}`).pipe(
      map((summary) => {
        return summary.body;
      })
    );
  }
}
