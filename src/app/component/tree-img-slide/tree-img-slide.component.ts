import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  Inject,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { OwlOptions } from 'ngx-owl-carousel-o';

import { IImage } from 'src/app/types';

export interface IImgNoteDialogData {
  title: string;
  note: string;
}

@Component({
  selector: 'app-img-note-dialog',
  templateUrl: '../dialog/note-dialog.html',
})
export class ImgNoteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ImgNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IImgNoteDialogData
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-tree-img-slide',
  templateUrl: './tree-img-slide.component.html',
  styleUrls: ['./tree-img-slide.component.css'],
})
export class TreeImgSlideComponent implements OnInit, OnChanges {
  imgIndex = 0;
  owlOpt: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      740: { items: 1 },
      940: { items: 1 },
    },
    nav: true,
  };

  @Input() tree: any;
  @Input() images: IImage[];
  @Output() clickImg: EventEmitter<IImage>;

  constructor(private readonly dialog: MatDialog, private readonly cdRef: ChangeDetectorRef) {
    this.clickImg = new EventEmitter();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'] && changes['images'].currentValue !== changes['images'].previousValue) {
      this.cdRef.detectChanges();
    }
  }

  onChangeImg(img) {
    this.imgIndex = img.startPosition;
    this.cdRef.detectChanges();
  }

  onClickImg(img) {
    this.clickImg.emit(img);
  }

  onClickImgNote() {
    const note = this.images[this.imgIndex].note;
    this.dialog.open(ImgNoteDialogComponent, {
      width: '300px',
      data: { title: 'Image Note: ', note },
    });
  }

  public get note(): string {
    const img = this.images[this.imgIndex];
    return img ? img.note : '';
  }
}
