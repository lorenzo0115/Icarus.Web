import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  SimpleChanges,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';

import { AgmMap, MapsAPILoader } from '@agm/core';

import { filter } from 'rxjs/operators/filter';
import { tap } from 'rxjs/operators/tap';

import isEmpty from 'lodash/isEmpty';
import { MAP_TYPE } from 'src/app/types';
import { combineLatest } from 'rxjs';
import { CompanySiteStateService } from '../../_core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-company-site-map',
  templateUrl: './company-site-map.component.html',
  styleUrls: ['./company-site-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanySiteMapComponent implements OnInit, OnChanges {
  private _map: any;
  private _mapZoomScale: number;
  mapType: MAP_TYPE;

  lat: number;
  lng: number;

  @Input() sites: any[];
  @ViewChild('siteMap', { static: false }) siteMap: AgmMap;

  constructor(
    private readonly _cdRef: ChangeDetectorRef,
    private readonly _mapsApiLoader: MapsAPILoader,
    private readonly _siteStore: CompanySiteStateService
  ) {
    this.setVariables();
  }

  ngOnInit(): void {
    this.setMapBounds();

    combineLatest([
      this._siteStore.focusedSite,
      this._siteStore.mouseOverSite.pipe(
        tap((site) => {
          this.setMapPinBounce(site);
          this._cdRef.detectChanges();
        })
      ),
      this._siteStore.mouseLeaveSite.pipe(
        tap((site) => {
          this.removeMapPinBounce(site);
          this._cdRef.detectChanges();
        })
      ),
    ]).subscribe(([focusedSite, _ignore1, _ignore2]) => {
      this.highlightSite(focusedSite);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sites'] && changes['sites'].previousValue !== changes['sites'].currentValue) {
      this.setMapBounds();
      this._cdRef.detectChanges();
    }
  }

  setVariables(): void {
    this._mapZoomScale = 18;
    this.mapType = MAP_TYPE.SATELLITE;
  }

  highlightSite(site) {
    const { Latitude: lat, Longitude: lng } = site;
    this.setMapPinBounce(site);
    this.setMapCenter(lat, lng);
    this.setMapZoom(this._mapZoomScale);
    this._cdRef.detectChanges();
  }

  onMapReady(event) {
    this._map = event;
    this._map.controls[window['google'].maps.ControlPosition.TOP_LEFT].push(
      document.getElementById('refresh-site-map')
    );
  }

  onSelectMarker(site) {
    site.ViewWindow = true;
  }

  onRecenterMap(): void {
    this.setMapBounds();
  }

  onViewDetail(event, site): void {
    event.preventDefault();
    console.log('site: ', site);
  }

  setMapCenter(lat, lng) {
    const center = new window['google'].maps.LatLng(lat, lng);
    this._map?.setCenter(center);
  }

  setMapZoom(zoom) {
    this._map?.setZoom(zoom);
  }

  setMapBounds() {
    this._mapsApiLoader.load().then(() => {
      if (!this._map || !this.sites) return;

      if (this.sites.length === 0) {
        const center = new window['google'].maps.LatLng(this.lat, this.lng);
        this._map.setCenter(center);
        return;
      }

      const bounds = new window['google'].maps.LatLngBounds();
      this.sites.forEach((site) => {
        bounds.extend(new window['google'].maps.LatLng(site.Latitude, site.Longitude));
      });
      this._map.fitBounds(bounds);
    });
  }

  setMapPinBounce({ Site_ID: siteId }) {
    this.sites.filter((site) => Boolean(site.animation)).map((site) => (site.animation = null));
    this.sites.find((site) => site.Site_ID === siteId).animation = 'BOUNCE';
  }

  removeMapPinBounce({ Site_ID: siteId }) {
    this.sites.find((el) => el.Site_ID === siteId).animation = null;
  }
}
