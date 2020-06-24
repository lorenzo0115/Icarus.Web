import { Component, OnInit, OnChanges, Input, Output, EventEmitter, Inject, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TREE_CATEGORY, IImage } from 'src/app/types';
import { MapService } from 'src/app/core';

export interface ITreeNoteDialogData {
  title: string;
  note: string;
}

@Component({
  selector: 'app-tree-note-dialog',
  templateUrl: '../dialog/note-dialog.html',
})
export class ImgNoteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ImgNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITreeNoteDialogData
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-tree-card',
  templateUrl: './tree-card.component.html',
  styleUrls: ['./tree-card.component.css'],
})
export class TreeCardComponent implements OnInit, OnChanges {
  images: IImage[];
  imgSize: any;
  imgIndex: number;
  estimate: any;

  @Input() tree: any;
  @Input() category: TREE_CATEGORY;
  @Output() locate: EventEmitter<any>;
  @Output() previewImg: EventEmitter<any>;

  constructor(private readonly mapService: MapService, public matDialog: MatDialog) {
    this.setVariables();
  }

  ngOnInit(): void {
    this.getTreeImg();
    this.getTreeEstimate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tree'] && changes['tree'].previousValue !== changes['tree'].currentValue) {
      this.getTreeImg();
      this.getTreeEstimate();
    }
  }

  setVariables() {
    this.imgIndex = 0;
    this.imgSize = { width: '100%' };
    this.locate = new EventEmitter();
    this.previewImg = new EventEmitter();
  }

  getTreeImg() {
    this.images = this.tree?.Images?.map((img, index) => ({
      id: index,
      note: img.Note ?? '',
      thumbUrl: img.Image_URL ?? '',
      fullUrl: img.Image_URL_Large ?? '',
      isDefault: img.Default,
    }));
  }

  getTreeEstimate() {
    this.estimate = this.tree?.Estimate_Items?.reduce((acc, cur) => acc + cur.Amount, 0) ?? 0;
  }

  onMouseOver() {
    this.mapService.setMouseEnteredTree(this.tree);
  }

  onMouseOut() {
    this.mapService.setMouseLeftTree(this.tree);
  }

  onClickImg(img) {
    this.previewImg.emit(img);
  }

  onClickTreeNote(event) {
    event.preventDefault();
    if (!this.tree.note) return;

    this.matDialog.open(ImgNoteDialogComponent, {
      width: '300px',
      data: {
        title: 'Tree Note: ',
        note: this.tree.Note,
      },
    });
  }

  onShowInMap() {
    this.locate.emit(this.tree);
  }

  public get completed(): boolean {
    if (!this.tree) return false;
    return this.category === TREE_CATEGORY.ESTIMATE && this.tree.Completed;
  }

  public get pending(): boolean {
    if (!this.tree) return false;
    return this.category === TREE_CATEGORY.ESTIMATE && !this.tree.Completed;
  }

  public get imgNoteMoreBtn(): boolean {
    const note = (this.tree?.Images && this.tree.Images[this.imgIndex]?.Note) || '';
    return Boolean(note);
  }

  public get treeNoteMoreBtn(): boolean {
    return Boolean(this.tree?.Note);
  }
}
