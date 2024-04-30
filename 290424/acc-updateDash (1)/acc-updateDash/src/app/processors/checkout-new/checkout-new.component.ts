import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Assets',
    children: [{name: 'Bank'}, {name: 'Cash'}, {name: 'Processors'}],
  },
  {
    name: 'Libilities',
    children: [
      {
        name: 'Payout',
        children: [{name: 'BCC'}, {name: 'Truelayer'}],
      },
      {
        name: 'Fees',
        children: [{name: 'Credox'}, {name: 'Paysafe'}],
      },
    ],
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-checkout-new',
  templateUrl: './checkout-new.component.html',
  styleUrl: './checkout-new.component.css'
})
export class CheckoutNewComponent {


  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
