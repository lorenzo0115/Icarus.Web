import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css'],
})
export class PdfViewerComponent implements OnInit, OnChanges {
  pdfSrc: string;
  tempPdf: any;
  isPdfLoaded: boolean;

  @Input() pdfPath: string;

  constructor() {
    this.isPdfLoaded = false;
    this.pdfSrc = '';
  }

  ngOnInit(): void {
    this.setPdfSrc();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pdfPath'] && changes['pdfPath'].previousValue !== changes['pdfPath'].currentValue) {
      this.setPdfSrc();
    }
  }

  setPdfSrc(): void {
    //TODO: for dev env
    // const strArr = this.pdfPath.split('/').slice(3);
    // const pdfSrc = ['', ...strArr].join('/');
    // this.pdfSrc = pdfSrc;

    //TODO: for prod env
    this.pdfSrc = this.pdfPath;
  }

  onInitPdfView(event): void {
    this.isPdfLoaded = true;
    this.tempPdf = event;
  }

  onLoadError(): void {
    console.error('on load pdf error: ');
  }

  onDownloadPdf(): void {
    this.tempPdf.getData().then((u8) => {
      const blob = new Blob([u8.buffer], {
        type: 'application/pdf',
      });

      const filename = 'Estimate PDF Report';
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
        return;
      }

      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display:none;');
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = `${filename}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  onPrintPdf(): void {
    this.tempPdf.getData().then((u8) => {
      const blob = new Blob([u8.buffer], {
        type: 'application/pdf',
      });

      const filename = 'Estimate PDF Report';
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
        return;
      }

      const url = window.URL.createObjectURL(blob);
      window.open(url).print();
    });
  }
}
