import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core';
import { TREE_CATEGORY } from 'src/app/types';

@Component({
  selector: 'app-customer-estimate',
  templateUrl: './customer-estimate.component.html',
  styleUrls: ['./customer-estimate.component.css'],
})
export class CustomerEstimateComponent implements OnInit {
  constructor(private readonly _globalStore: StateService) {}

  ngOnInit(): void {
    this._globalStore.setTreeCategory(TREE_CATEGORY.ESTIMATE);
  }
}
