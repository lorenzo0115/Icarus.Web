import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

export interface ClientNode {
  id: string;
  name: string;
  count?: number;
  companyId?: string;
  children?: ClientNode[];
}

export interface FlatClientNode {
  expandable: boolean;
  id: string;
  companyId: string;
  name: string;
  level: number;
  count: number;
}

@Component({
  selector: 'app-client-tree-node',
  templateUrl: './client-tree-node.component.html',
  styleUrls: ['./client-tree-node.component.css'],
})
export class ClientTreeNodeComponent implements OnInit, OnChanges {
  @Output() select: EventEmitter<any> = new EventEmitter();

  clientList: any;

  treeControl: FlatTreeControl<FlatClientNode>;
  treeFlattener: MatTreeFlattener<any, any>;
  treeDataSource: MatTreeFlatDataSource<any, any>;
  isTreeNodeExpanded = true;

  constructor() {
    this.setTreeVariables();
  }

  ngOnInit(): void {}

  ngOnChanges(): void {}

  private _transformer = (node: ClientNode, level: number) => {
    return {
      id: node.id,
      level: level,
      name: node.name,
      count: node.count || 0,
      companyId: node.companyId || '',
      expandable: !!node.children && node.children.length > 0,
    };
    // tslint:disable-next-line: semicolon
  };

  setTreeVariables() {
    this.treeControl = new FlatTreeControl<FlatClientNode>(
      (node) => node.level,
      (node) => node.expandable
    );

    this.treeFlattener = new MatTreeFlattener(
      this._transformer,
      (node) => node.level,
      (node) => node.expandable,
      (node) => node.children
    );

    this.treeDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  setTreeData(data) {
    this.clientList = data;

    const treeData = this.clientList.reduce((accumulate, cur) => {
      const temp = { id: cur.Company_ID, name: cur.Company, children: [] };
      cur.Clients.map((cl) =>
        temp.children.push({
          id: cl.ClientID,
          companyId: cur.Company_ID,
          name: cl.Client_Name,
          count: cl.Site_Count,
        })
      );

      return [...accumulate, temp];
    }, []);

    this.treeDataSource.data = treeData;
    setTimeout(() => {
      this.treeControl.expandAll();
    });
  }

  onSelectClient(node) {
    this.select.emit(node);
  }

  hasChild = (_: number, node: FlatClientNode) => node.expandable;
}
