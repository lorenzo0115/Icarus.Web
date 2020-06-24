import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTreeServiceTableComponent } from './site-tree-service-table.component';

describe('SiteTreeServiceTableComponent', () => {
  let component: SiteTreeServiceTableComponent;
  let fixture: ComponentFixture<SiteTreeServiceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteTreeServiceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteTreeServiceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
