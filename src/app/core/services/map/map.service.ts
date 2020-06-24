import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private focusedSiteSubject: BehaviorSubject<any> = new BehaviorSubject({});
  focusedSite = this.focusedSiteSubject.asObservable().pipe(distinctUntilChanged());

  private mouseEnteredSiteSubject: BehaviorSubject<any> = new BehaviorSubject({});
  mouseEnteredSite = this.mouseEnteredSiteSubject.asObservable().pipe(distinctUntilChanged());

  private mouseLeftSiteSubject: BehaviorSubject<any> = new BehaviorSubject({});
  mouseLeftSite = this.mouseLeftSiteSubject.asObservable().pipe(distinctUntilChanged());

  private focusedTreeSubject: BehaviorSubject<any> = new BehaviorSubject({});
  focusedTree = this.focusedTreeSubject.asObservable().pipe(distinctUntilChanged());

  private mouseEnteredTreeSubject: BehaviorSubject<any> = new BehaviorSubject({});
  mouseEnteredTree = this.mouseEnteredTreeSubject.asObservable().pipe(distinctUntilChanged());

  private mouseLeftTreeSubject: BehaviorSubject<any> = new BehaviorSubject({});
  mouseLeftTree = this.mouseLeftTreeSubject.asObservable().pipe(distinctUntilChanged());

  private infoTreeSubject: BehaviorSubject<any> = new BehaviorSubject({});
  infoTree = this.infoTreeSubject.asObservable().pipe(distinctUntilChanged());

  constructor() {}

  setFocusedSite(site: any): void {
    this.focusedSiteSubject.next(site);
  }

  setMouseEnteredSite(site: any): void {
    this.mouseEnteredSiteSubject.next(site);
  }

  setMouseLeftSite(site: any): void {
    this.mouseLeftSiteSubject.next(site);
  }

  setFocusedTree(tree: any): void {
    this.focusedTreeSubject.next(tree);
  }

  setMouseEnteredTree(tree: any): void {
    this.mouseEnteredTreeSubject.next(tree);
  }

  setMouseLeftTree(tree: any): void {
    this.mouseLeftTreeSubject.next(tree);
  }

  setInfoTree(tree: any): void {
    this.infoTreeSubject.next(tree);
  }
}
