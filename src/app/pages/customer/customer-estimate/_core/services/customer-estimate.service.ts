import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators/map';

import { ApiService } from 'src/app/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerEstimateService {
  constructor(private readonly _api: ApiService) {}

  getEstimateSummary() {
    return this._api.get('/Customer/Estimates_Summary').pipe(map((res) => res.body));
  }

  getEstimateById(id: string) {
    return this._api.get(`/Customer/Estimate?Estimate_ID=${id}`).pipe(map((res) => res.body));
  }

  getEstimateByStatus(status: any) {
    return this._api.get(`/Customer/Estimates?Estimate_Status=${status}`).pipe(map((res) => res.body));
  }

  getEstimateTermsAndConditions(companyId, estimateId) {
    return this._api
      .get(`/Customer/TermsAndConditions?Company_ID=${companyId}&Estimate_ID=${estimateId}`)
      .pipe(map((res) => res.body));
  }

  approveEstimate(companyId, estimateId) {
    return this._api
      .put('/Customer/Estimate/Approve', {
        Company_ID: companyId,
        Estimate_ID: estimateId,
      })
      .pipe(map((res) => res.body));
  }

  getEstimateSummaryById(estId) {
    return this._api.get(`/Customer/EstimateSummary?Estimate_ID=${estId}`).pipe(map((res) => res.body));
  }

  getEstimateAssetServices(estId) {
    return this._api.get(`/Customer/Estimate/AssetServices?Estimate_ID=${estId}`).pipe(map((res) => res.body));
  }
}
