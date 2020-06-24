import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  ViewChild,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

import { AgmMap, MapsAPILoader } from '@agm/core';

import { Subject } from 'rxjs/Subject';
import { filter } from 'rxjs/operators/filter';
import { tap } from 'rxjs/operators/tap';
import { takeUntil } from 'rxjs/operators/takeUntil';

import isEmpty from 'lodash/isEmpty';

import { MAP_TYPE } from 'src/app/types';
import { MapService } from 'src/app/core';

declare var $: any;

@Component({
  selector: 'app-tree-map',
  templateUrl: './tree-map.component.html',
  styleUrls: ['./tree-map.component.css'],
})
export class TreeMapComponent implements OnInit, OnChanges, OnDestroy {
  private stop$: Subject<any>;

  map: any;
  type: MAP_TYPE;

  @Input() lat: any;
  @Input() lng: any;
  @Input() trees: any[];
  @Input() isHoverEnable: boolean;
  @Input() isShowCompletedTree: boolean;
  @Output() previewImg: EventEmitter<any>;
  @ViewChild('treeMap', { static: false }) treeMap: AgmMap;

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly mapsApiLoader: MapsAPILoader,
    private readonly mapService: MapService
  ) {
    this.setVariables();
  }

  ngOnInit(): void {
    this.getHoverTree();
    this.getHoverOutTree();
    this.setMapBounds();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trees'] && changes['trees'].previousValue !== changes['trees'].currentValue) {
      this.setMapBounds();
    }
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  setVariables() {
    this.type = MAP_TYPE.SATELLITE;
    this.stop$ = new Subject();
    this.previewImg = new EventEmitter();
  }

  getHoverTree() {
    this.mapService.mouseEnteredTree
      .pipe(
        filter((tree) => !isEmpty(tree) && this.isHoverEnable),
        tap((tree) => this.setMapPinBounce(tree)),
        takeUntil(this.stop$)
      )
      .subscribe(() => {
        this.cdRef.detectChanges();
      });
  }

  getHoverOutTree() {
    this.mapService.mouseLeftTree
      .pipe(
        filter((tree) => !isEmpty(tree) && this.isHoverEnable),
        tap((tree) => this.removeMapPinBounce(tree)),
        takeUntil(this.stop$)
      )
      .subscribe(() => {
        this.cdRef.detectChanges();
      });
  }

  showSpecificTree(tree) {
    const { Latitude: lat, Longitude: lng } = tree;
    this.setMapCenter(lat, lng);
    this.setMapZoom(20);
    this.setMapPinBounce(tree);
    setTimeout(() => {
      this.removeMapPinBounce(tree);
    }, 20 * 1000);
  }

  onMapReady(event) {
    this.map = event;
    this.map.controls[window['google'].maps.ControlPosition.TOP_LEFT].push(document.getElementById('refresh-map'));
  }

  onRecenterMap() {
    this.setMapBounds();
  }

  onSelectMarker(tree) {
    tree.ViewWindow = true;
  }

  onOpenInfoWindow(tree) {
    this.mapService.setInfoTree(tree);
    $('#tree-dialog').modal('show');
  }

  onViewImg(tree) {
    const imgArr = tree?.Images.map((img) => ({
      default: img.Default,
      thumbUrl: img.Image_URL,
      fullUrl: img.Image_URL_Large,
      note: img.Note,
    }));
    this.previewImg.emit(imgArr[0]);
  }

  setMapCenter(lat, lng) {
    const center = new window['google'].maps.LatLng(lat, lng);
    this.map.setCenter(center);
  }

  setMapZoom(zoom) {
    this.map.setZoom(zoom);
  }

  setMapBounds() {
    this.mapsApiLoader.load().then(() => {
      const bounds = new window['google'].maps.LatLngBounds();

      if (!this.trees || !this.map) return;

      if (this.trees.length === 0) {
        const center = new window['google'].maps.LatLng(this.lat, this.lng);
        this.map.setCenter(center);
      }

      this.trees.forEach((tree) => {
        bounds.extend(new window['google'].maps.LatLng(tree.Latitude, tree.Longitude));
      });

      setTimeout(() => {
        this.map.fitBounds(bounds);
      }, 2 * 100);
    });
  }

  setMapPinBounce({ Asset_ID }) {
    this.trees.filter((tree) => Boolean(tree.animation)).map((tree) => (tree.animation = null));
    this.trees.find((tree) => tree.Asset_ID === Asset_ID).animation = 'BOUNCE';
  }

  removeMapPinBounce({ Asset_ID }): void {
    this.trees.find((tree) => tree.Asset_ID === Asset_ID).animation = null;
  }
}
