import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveViewSiteHeaderComponent } from './live-view-site-header.component';

describe('LiveViewSiteHeaderComponent', () => {
  let component: LiveViewSiteHeaderComponent;
  let fixture: ComponentFixture<LiveViewSiteHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveViewSiteHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveViewSiteHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
