import { Component, OnInit, OnChanges } from '@angular/core';
import {hierarchialGraph} from '../models';
import * as shape from 'd3-shape';

export interface Node {
  id: string;
  label: string;
}

export interface Link {
  source: string;
  target: string;
}

export interface GraphObject {
  nodes: Array<Node>;
  links: Array<Link>;
}

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})

export class MainViewComponent implements OnInit {

  nextNodeConfiguration;
  newNodeLabel: string;
  nodeInfo: string;
  showNodeCreationDialog = false;
  isNewGraph = false;
  width = 1800;
  height = 500;
  view: any[];
  colorScheme: any;
  curve: any = shape.curveLinear;
  hierarchialGraph: GraphObject;
  constructor() { }

  ngOnInit() {

    this.applyDimensions();

    this.hierarchialGraph = hierarchialGraph;
  }

  applyDimensions() {
    this.view = [this.width, this.height];
  }

  createNewGraph(event) {
    if (event) {
      this.hierarchialGraph = {
        nodes: [],
        links: []
      };
      this.isNewGraph = true;
    }
  }

  select(node) {
    this.createNode();
    const nextNodeId = this.hierarchialGraph.nodes.length > 1 ?
    `${(parseInt(this.hierarchialGraph.nodes[this.hierarchialGraph.nodes.length - 1].id, 10) + 1)}` : '1';
    const nextLink = {
      source: node.id,
      target: nextNodeId
    };

    const nextNode = {
      id: nextNodeId,
      label: ''
    };

    this.nextNodeConfiguration = {
      link: nextLink,
      node: nextNode
    };
  }

  createNode() {
    this.showNodeCreationDialog = true;
    this.newNodeLabel = '';
  }


  hideDialog() {
    this.showNodeCreationDialog = false;
    this.newNodeLabel = '';
  }

  finalizeCreation () {
    if (!this.isNewGraph) {
      this.nextNodeConfiguration.node.label = this.newNodeLabel;
      this.hierarchialGraph.links = [...this.hierarchialGraph.links, this.nextNodeConfiguration.link];
      this.hierarchialGraph.nodes = [...this.hierarchialGraph.nodes, this.nextNodeConfiguration.node];
    }

    if (this.isNewGraph) {
      const newNode = {
        id: 'start',
        label: this.newNodeLabel
      };

      this.hierarchialGraph.nodes = [...this.hierarchialGraph.nodes, newNode];
      this.isNewGraph = false;
    }

    this.newNodeLabel = '';
    this.showNodeCreationDialog = false;
  }
}
