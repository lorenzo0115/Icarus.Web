import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgmMap, MapsAPILoader } from '@agm/core';

import { filter } from 'rxjs/operators/filter';
import { tap } from 'rxjs/operators/tap';

import isEmpty from 'lodash/isEmpty';

import { MAP_TYPE } from 'src/app/types';
import { MapService } from 'src/app/core';

@Component({
  selector: 'app-customer-site-map',
  templateUrl: './customer-site-map.component.html',
  styleUrls: ['./customer-site-map.component.css'],
})
export class CustomerSiteMapComponent implements OnInit, OnChanges {
  map: any;
  type: MAP_TYPE;
  mapZoomScale: number;

  @Input() lat: any;
  @Input() lng: any;
  @Input() sites: any[];
  @ViewChild('siteMap', { static: false }) siteMap: AgmMap;

  constructor(
    private readonly _router: Router,
    private readonly _mapsApiLoader: MapsAPILoader,
    private readonly _mapService: MapService
  ) {
    this.setVariables();
  }

  ngOnInit(): void {
    this.getFocusedSite();
    this.getMouseEnteredSite();
    this.getMouseLeftSite();
  }

  ngOnChanges(): void {
    if (Boolean(this.sites) && this.sites.length > 0) {
      this.setMapBounds();
    }
  }

  setVariables() {
    this.mapZoomScale = 18;
    this.type = MAP_TYPE.SATELLITE;
  }

  getFocusedSite() {
    this._mapService.focusedSite
      .pipe(
        filter((site) => !isEmpty(site)),
        tap((site) => this.specifySite(site))
      )
      .subscribe(() => {});
  }

  getMouseEnteredSite() {
    this._mapService.mouseEnteredSite
      .pipe(
        filter((site) => !isEmpty(site)),
        tap((site) => {
          this.setMapPinBounce(site);
        })
      )
      .subscribe(() => {});
  }

  getMouseLeftSite() {
    this._mapService.mouseLeftSite
      .pipe(
        filter((site) => !isEmpty(site)),
        tap((site) => this.removeMapPinBounce(site))
      )
      .subscribe(() => {});
  }

  onMapReady(event) {
    this.map = event;
    this.map.controls[window['google'].maps.ControlPosition.TOP_LEFT].push(document.getElementById('refresh-site-map'));
  }

  onSelectMarker(site) {
    site.ViewWindow = true;
  }

  onViewDetail(event, site) {
    event.preventDefault();
    this._router.navigateByUrl(`/site/asset/${site.Site_ID}`);
  }

  onRecenterMap() {
    this.setMapBounds();
  }

  specifySite(site) {
    const { Latitude: lat, Longitude: lng } = site;
    this.setMapZoom(this.mapZoomScale);
    this.setMapCenter(lat, lng);
    this.setMapPinBounce(site);
    setTimeout(() => {
      this.removeMapPinBounce(site);
    }, 20 * 1000);
  }

  setMapCenter(lat, lng) {
    if (!this.map) return;
    const center = new window['google'].maps.LatLng(lat, lng);
    this.map.setCenter(center);
  }

  setMapZoom(zoom) {
    if (!this.map) return;
    this.map.setZoom(zoom);
  }

  setMapBounds() {
    this._mapsApiLoader.load().then(() => {
      if (!this.map) return;

      if (this.sites.length === 0) {
        const center = new window['google'].maps.LatLng(this.lat, this.lng);
        this.map.setCenter(center);
        return;
      }

      const bounds = new window['google'].maps.LatLngBounds();
      this.sites.forEach((site) => {
        bounds.extend(new window['google'].maps.LatLng(site.Latitude, site.Longitude));
      });
      this.map.fitBounds(bounds);
    });
  }

  setMapPinBounce(site) {
    if (!this.map) return;
    this.sites.find((el) => el.Site_ID === site.Site_ID).animation = 'BOUNCE';
  }

  removeMapPinBounce(site) {
    if (!this.map) return;
    this.sites.find((el) => el.Site_ID === site.Site_ID).animation = null;
  }
}
