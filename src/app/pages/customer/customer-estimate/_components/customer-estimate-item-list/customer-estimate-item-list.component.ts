import { Component, OnInit, Input } from '@angular/core';
import { ESTIMATE_ITEM } from 'src/app/types';

@Component({
  selector: 'app-customer-estimate-item-list',
  templateUrl: './customer-estimate-item-list.component.html',
  styleUrls: ['./customer-estimate-item-list.component.css'],
})
export class CustomerEstimateItemListComponent implements OnInit {
  description: string;

  @Input() list: any[];
  @Input() type: ESTIMATE_ITEM;
  @Input() genericColor: boolean;

  displayedColumns: string[] = ['Common_Name', 'Amount', 'Count'];

  constructor() {
    this.description = '';
  }

  ngOnInit(): void {}

  getPinColor(color) {
    return 'rgb(' + color.join(', ') + ')';
  }

  onClickItem(item): void {
    this.description = item.description;
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.list.map((t) => t.Amount).reduce((acc, value) => acc + value, 0);
  }

  public get title(): string {
    let title = '';
    switch (this.type) {
      case ESTIMATE_ITEM.ASSET:
        title = 'Assets';
        break;
      case ESTIMATE_ITEM.SERVICE:
        title = 'Services';
        break;
      case ESTIMATE_ITEM.OTHER_SERVICE:
        title = 'Other Services';
        break;
      default:
        break;
    }

    return `${title}`;
  }

  public get itemType(): string {
    let itemType = '';
    switch (this.type) {
      case ESTIMATE_ITEM.ASSET:
        itemType = 'Asset Type';
        break;
      case ESTIMATE_ITEM.SERVICE:
        itemType = 'Service Type';
        break;
      case ESTIMATE_ITEM.OTHER_SERVICE:
        itemType = 'Other Service Type';
        break;
      default:
        break;
    }

    return itemType;
  }

  public get totalQuantity(): any {
    return this.list.reduce((acc, cur) => acc + cur.quantity, 0);
  }

  public get totalAmount(): any {
    return this.list.reduce((acc, cur) => acc + cur.amount, 0);
  }

  public get isService(): boolean {
    return this.type === ESTIMATE_ITEM.SERVICE;
  }

  public get isOtherService(): boolean {
    return this.type === ESTIMATE_ITEM.OTHER_SERVICE;
  }

  public get isAsset(): boolean {
    return this.type === ESTIMATE_ITEM.ASSET;
  }
}
