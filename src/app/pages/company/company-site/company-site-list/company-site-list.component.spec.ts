import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySiteListComponent } from './company-site-list.component';

describe('CompanySiteListComponent', () => {
  let component: CompanySiteListComponent;
  let fixture: ComponentFixture<CompanySiteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySiteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
