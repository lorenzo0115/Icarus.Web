import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { tap } from 'rxjs/operators/tap';

import { MapService, StateService } from 'src/app/core';
import { IImage, TREE_CATEGORY } from 'src/app/types';

declare var $: any;

@Component({
  selector: 'app-tree-dialog',
  templateUrl: './tree-dialog.component.html',
  styleUrls: ['./tree-dialog.component.css'],
})
export class TreeDialogComponent implements OnInit {
  tree: any;
  images: IImage[];
  category: TREE_CATEGORY;

  @Output() viewFullImg: EventEmitter<any>;

  constructor(private readonly state: StateService, private readonly mapService: MapService) {
    this.viewFullImg = new EventEmitter();
  }

  ngOnInit(): void {
    this.state.treeCategory.subscribe((category) => {
      this.category = category;
    });

    this.setDialogEventListener();
  }

  setDialogEventListener(): void {
    $('#tree-dialog').on('shown.bs.modal', () => {
      this.mapService.infoTree.pipe(tap((tree) => (this.tree = tree))).subscribe(() => {
        this.setImage();
      });
    });
  }

  setImage() {
    this.images = this.tree?.Images?.map((img, index) => ({
      id: index,
      note: img.Note ?? '',
      thumbUrl: img.Image_URL ?? '',
      fullUrl: img.Image_URL_Large ?? '',
      isDefault: img.Default,
    }));
  }

  onShowFullImg(img) {
    this.state.setTreeImg(img);
  }
}
