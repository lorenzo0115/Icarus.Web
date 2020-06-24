import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySiteMapComponent } from './company-site-map.component';

describe('CompanySiteMapComponent', () => {
  let component: CompanySiteMapComponent;
  let fixture: ComponentFixture<CompanySiteMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySiteMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySiteMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
