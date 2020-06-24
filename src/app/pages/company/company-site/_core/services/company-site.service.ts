import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators/map';

import { ApiService } from 'src/app/core';

@Injectable({
  providedIn: 'root',
})
export class CompanySiteService {
  constructor(private readonly _api: ApiService) {}

  getSites() {
    return this._api.get('/Company/Sites').pipe(map((sites) => sites.body));
  }
}
