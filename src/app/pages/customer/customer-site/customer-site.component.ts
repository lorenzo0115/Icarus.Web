import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core';
import { TREE_CATEGORY } from 'src/app/types';

@Component({
  selector: 'app-customer-site',
  templateUrl: './customer-site.component.html',
  styleUrls: ['./customer-site.component.css'],
})
export class CustomerSiteComponent implements OnInit {
  constructor(private readonly _globalStore: StateService) {}

  ngOnInit(): void {
    this._globalStore.setTreeCategory(TREE_CATEGORY.SITE);
  }
}
