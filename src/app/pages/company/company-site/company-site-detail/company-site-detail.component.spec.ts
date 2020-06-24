import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySiteDetailComponent } from './company-site-detail.component';

describe('CompanySiteDetailComponent', () => {
  let component: CompanySiteDetailComponent;
  let fixture: ComponentFixture<CompanySiteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySiteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySiteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
