import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeServicesTableComponent } from './tree-services-table.component';

describe('TreeServicesTableComponent', () => {
  let component: TreeServicesTableComponent;
  let fixture: ComponentFixture<TreeServicesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeServicesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeServicesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
