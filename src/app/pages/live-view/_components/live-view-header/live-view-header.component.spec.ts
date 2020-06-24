import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveViewHeaderComponent } from './live-view-header.component';

describe('LiveViewHeaderComponent', () => {
  let component: LiveViewHeaderComponent;
  let fixture: ComponentFixture<LiveViewHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveViewHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveViewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
