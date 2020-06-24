import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTreeNodeComponent } from './client-tree-node.component';

describe('ClientTreeNodeComponent', () => {
  let component: ClientTreeNodeComponent;
  let fixture: ComponentFixture<ClientTreeNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientTreeNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientTreeNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
