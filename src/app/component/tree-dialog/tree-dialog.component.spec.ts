import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeDialogComponent } from './tree-dialog.component';

describe('TreeDialogComponent', () => {
  let component: TreeDialogComponent;
  let fixture: ComponentFixture<TreeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
