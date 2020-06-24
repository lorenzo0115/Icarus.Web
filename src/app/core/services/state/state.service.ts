import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';

import { TREE_CATEGORY } from 'src/app/types';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _windowWidthSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  windowWidth = this._windowWidthSubject.asObservable().pipe(distinctUntilChanged());

  private _windowHeightSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  windowHeight = this._windowHeightSubject.asObservable().pipe(distinctUntilChanged());

  private _treeCategorySubject: BehaviorSubject<TREE_CATEGORY> = new BehaviorSubject(TREE_CATEGORY.UNKNOWN);
  treeCategory = this._treeCategorySubject.asObservable().pipe(distinctUntilChanged());

  private _treeRatingSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  treeRating = this._treeRatingSubject.asObservable().pipe(distinctUntilChanged());

  private _diameterBreastHeightSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  diameterBreastHeight = this._diameterBreastHeightSubject.asObservable().pipe(distinctUntilChanged());

  private _treeImgSubject: Subject<any> = new Subject();
  treeImg = this._treeImgSubject.asObservable().pipe();

  constructor() {}

  setWindowWidth(width: number) {
    this._windowWidthSubject.next(width);
  }

  setWindowHeight(height: number) {
    this._windowHeightSubject.next(height);
  }

  setTreeCategory(category: TREE_CATEGORY) {
    this._treeCategorySubject.next(category);
  }

  setTreeRating(data) {
    this._treeRatingSubject.next(data);
  }

  setDiameterBreastHeight(data) {
    this._diameterBreastHeightSubject.next(data);
  }

  setTreeImg(img: any) {
    this._treeImgSubject.next(img);
  }
}
