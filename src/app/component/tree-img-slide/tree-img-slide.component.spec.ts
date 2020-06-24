import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeImgSlideComponent } from './tree-img-slide.component';

describe('TreeImgSlideComponent', () => {
  let component: TreeImgSlideComponent;
  let fixture: ComponentFixture<TreeImgSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeImgSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeImgSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
