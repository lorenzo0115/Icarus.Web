import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySiteCardComponent } from './company-site-card.component';

describe('CompanySiteCardComponent', () => {
  let component: CompanySiteCardComponent;
  let fixture: ComponentFixture<CompanySiteCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySiteCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySiteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
