import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveViewAssetTableComponent } from './live-view-asset-table.component';

describe('LiveViewAssetTableComponent', () => {
  let component: LiveViewAssetTableComponent;
  let fixture: ComponentFixture<LiveViewAssetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveViewAssetTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveViewAssetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
