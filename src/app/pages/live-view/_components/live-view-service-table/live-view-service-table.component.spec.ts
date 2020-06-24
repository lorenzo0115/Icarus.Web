import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveViewServiceTableComponent } from './live-view-service-table.component';

describe('LiveViewServiceTableComponent', () => {
  let component: LiveViewServiceTableComponent;
  let fixture: ComponentFixture<LiveViewServiceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveViewServiceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveViewServiceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
