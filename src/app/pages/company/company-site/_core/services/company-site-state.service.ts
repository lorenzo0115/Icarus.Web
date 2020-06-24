import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';

@Injectable({
  providedIn: 'root',
})
export class CompanySiteStateService {
  private _focusedSiteSubject: Subject<any> = new Subject();
  focusedSite = this._focusedSiteSubject.asObservable();

  private _mouseOverSiteSubject: Subject<any> = new Subject();
  mouseOverSite = this._mouseOverSiteSubject.asObservable();

  private _mouseLeaveSiteSubject: Subject<any> = new Subject();
  mouseLeaveSite = this._mouseLeaveSiteSubject.asObservable();

  constructor() {}

  setFocusedSite(site: any): void {
    this._focusedSiteSubject.next(site);
  }

  setMouseOverSite(site: any) {
    this._mouseOverSiteSubject.next(site);
  }

  setMouseLeaveSite(site: any) {
    this._mouseLeaveSiteSubject.next(site);
  }
}
