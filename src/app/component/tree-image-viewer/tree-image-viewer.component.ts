import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tree-image-viewer',
  templateUrl: './tree-image-viewer.component.html',
  styleUrls: ['./tree-image-viewer.component.css'],
})
export class TreeImageViewerComponent implements OnInit {
  @Input() src: string;
  @Output() loadFail: EventEmitter<any>;

  constructor() {
    this.setVariables();
  }

  ngOnInit(): void {}

  setVariables(): void {
    this.loadFail = new EventEmitter();
  }

  onLoadErrorImg(event) {
    this.loadFail.emit();
  }
}
