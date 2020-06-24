import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeImageViewerComponent } from './tree-image-viewer.component';

describe('TreeImageViewerComponent', () => {
  let component: TreeImageViewerComponent;
  let fixture: ComponentFixture<TreeImageViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeImageViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
