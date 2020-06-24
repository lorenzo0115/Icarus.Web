import { Injectable } from '@angular/core';

import { map, tap } from 'rxjs/operators';

import { ApiService } from '../api/api.service';
import { StateService } from '../state/state.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private readonly _api: ApiService, private readonly _globalStore: StateService) {}

  getTreeRating() {
    return this._api.get('/Customer/Dropdowns/TreeRating').pipe(
      map((res) => res.body),
      tap((res) => this._globalStore.setTreeRating(res))
    );
  }

  getDiameterHeight() {
    return this._api.get('/Customer/Dropdowns/DiameterBreastHeight').pipe(
      map((res) => res.body),
      tap((res) => this._globalStore.setDiameterBreastHeight(res))
    );
  }

  getCompanies(): Observable<any> {
    return this._api.get('/Customer/Companies').pipe(map((res) => res.body));
  }
}
