import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators/map';

import { ApiService } from 'src/app/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerSiteService {
  constructor(private readonly _api: ApiService) {}

  getSites() {
    return this._api.get('/Customer/Sites').pipe(map((res) => res.body));
  }

  getSiteById(siteId) {
    return this._api.get(`/Customer/Site?Site_ID=${siteId}`).pipe(map((site) => site.body));
  }

  getSiteByCompanyAndClient(companyId, clientId) {
    return this._api.get(`/Customer/Sites?Company_ID=${companyId}&ClientID=${clientId}`).pipe(map((res) => res.body));
  }

  getSiteEstimates(siteId) {
    return this._api.get(`/Customer/SiteEstimatesSummary?Site_ID=${siteId}`).pipe(map((res) => res.body));
  }

  getSiteEstimatesByStatus(siteId, estStatus) {
    return this._api
      .get(`/Customer/Estimates?Estimate_Status=${estStatus}&Site_ID=${siteId}`)
      .pipe(map((res) => res.body));
  }

  getSiteTrees(siteId) {
    return this._api.get(`/Customer/Trees?Site_ID=${siteId}`).pipe(map((res) => res.body));
  }

  getSiteSpeciesSummary(siteId) {
    return this._api.get(`/Customer/SiteSpeciesSummary?Site_ID=${siteId}`).pipe(map((res) => res.body));
  }

  getClients() {
    return this._api.get('/Customer/CompanyClientsList').pipe(map((res) => res.body));
  }

  getCompanies() {
    return this._api.get('/Customer/Companies').pipe(map((res) => res.body));
  }
}
