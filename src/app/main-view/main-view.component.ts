import { Component, OnInit, OnChanges } from '@angular/core';
import * as shape from 'd3-shape';

export interface GraphObject {
  nodes: Array<Object>;
  links: Array<Object>;
}

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})

export class MainViewComponent implements OnInit, OnChanges {

  showNodeCreationDialog = false;
  newGraph = false;
  width = 1800;
  height = 500;
  view: any[];
  colorScheme: any;
  curve: any = shape.curveLinear;
  hierarchialGraph: GraphObject;
  constructor() { }

  ngOnInit() {

    this.applyDimensions();

    this.hierarchialGraph = {
      nodes: [
        {
          id: 'start',
          label: 'Start node'
        }, {
          id: '1',
          label: 'node1',
        }, {
          id: '2',
          label: 'node2',
        }, {
          id: '3',
          label: 'node3'
        }, {
          id: '4',
          label: 'node4'
        }, {
          id: '5',
          label: 'node5'
        }, {
          id: '6',
          label: 'node6'
        }, {
          id: '7',
          label: 'node7'
        }
      ],
      links: [
        {
          source: 'start',
          target: '1'
        }, {
          source: 'start',
          target: '2'
        }, {
          source: '1',
          target: '3'
        }, {
          source: '2',
          target: '4'
        }, {
          source: '2',
          target: '6'
        }, {
          source: '3',
          target: '5'
        }, {
          source: '5',
          target: '7'
        }
      ]
    };
  }

  ngOnChanges(changes) {
    console.log(changes);
  }

  applyDimensions() {
    this.view = [this.width, this.height];
  }

  createNewGraph(e) {
    if (e) {
      this.hierarchialGraph = {
        nodes: [],
        links: []
      };
      this.newGraph = true;
    }
  }

  onLegendLabelClick(event) {
    console.log(event);
  }

  select(event) {
    console.log(event);
  }

  createNode() {
    this.showNodeCreationDialog = true;
  }

}
