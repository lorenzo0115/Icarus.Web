import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators/map';

import { ApiService } from 'src/app/core';

@Injectable({
  providedIn: 'root',
})
export class LiveViewService {
  constructor(private readonly _api: ApiService) {}

  getLiveViewEstimate(token) {
    return this._api.get(`/Estimate?Estimate_Notification_Code=${token}`).pipe(
      map((estimate) => {
        return estimate.body;
      })
    );
  }

  getLiveViewEstimateSummary(token) {
    return this._api.get(`/EstimateSummary?Estimate_Notification_Code=${token}`).pipe(
      map((summary) => {
        return summary.body;
      })
    );
  }

  getLiveViewSite(token) {
    return this._api.get(`/General/Site?Estimate_Notification_Code=${token}`).pipe(
      map((site) => {
        return site.body;
      })
    );
  }

  getLiveViewServices(token) {
    return this._api.get(`/Estimate/AssetServices?Estimate_Notification_Code=${token}`).pipe(
      map((services) => {
        return services.body;
      })
    );
  }

  getLiveViewTerms(token) {
    return this._api.get(`/TermsAndConditions?Estimate_Notification_Code=${token}`).pipe(
      map((terms) => {
        return terms.body;
      })
    );
  }

  approveLiveView(token) {
    return this._api.put('/Estimate/Approve', { Estimate_Notification_Code: token }).pipe(
      map((res) => {
        return res.body;
      })
    );
  }
}
