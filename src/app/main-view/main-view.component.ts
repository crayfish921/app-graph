import { Component, OnInit} from '@angular/core';
import { hierarchialGraph, pieChart } from '../models';
import * as shape from 'd3-shape';
import { CurrentView } from '../main-controls/main-controls.component';
import { DomSanitizer } from '@angular/platform-browser';

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

  currentView: CurrentView = {
    graph: false,
    pieChart: false
  };

  pieChartUri;
  graphUri;

  activePieChart;
  pieChart;
  showSliceCreatingDialog = false;
  newSliceLabel: string;
  newSliceValue: number;

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

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.currentView.pieChart = true;

    this.applyDimensions();

    this.pieChart = pieChart;
    this.hierarchialGraph = hierarchialGraph;

    this.pieChartUri = this.generateDownloadJsonUri(this.pieChart);
    this.graphUri = this.generateDownloadJsonUri(this.hierarchialGraph);
  }

  generateDownloadJsonUri(json) {
    const theJSON = JSON.stringify(json);
    const blob = new Blob([theJSON], { type: 'text/json' });
    const url = window.URL.createObjectURL(blob);
    const uri = this.sanitizer.bypassSecurityTrustUrl(url);
    return uri;
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
      this.graphUri = this.generateDownloadJsonUri(this.hierarchialGraph);
    }
  }

  createNewPieChart(event) {
    if (event) {
      this.pieChart = [];
      this.pieChartUri = this.generateDownloadJsonUri(this.pieChart);
    }
  }

  changeView(event) {
    this.currentView = event;
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

  createPieSlice() {
    this.showSliceCreatingDialog = true;
    this.newSliceLabel = '';
  }

  hideDialog() {
    this.showSliceCreatingDialog = false;
    this.showNodeCreationDialog = false;
    this.newNodeLabel = '';
  }

  finalizeSlice() {
    this.activePieChart = [...this.pieChart, {name: this.newSliceLabel, value: this.newSliceValue}];
    this.pieChart = this.activePieChart;
    this.newSliceLabel = '';
    this.newSliceValue = undefined;
    this.pieChartUri = this.generateDownloadJsonUri(this.pieChart);
  }

  finalizeCreation () {
    if (!this.isNewGraph) {
      this.nextNodeConfiguration.node.label = this.newNodeLabel;
      this.hierarchialGraph.links = [...this.hierarchialGraph.links, this.nextNodeConfiguration.link];
      this.hierarchialGraph.nodes = [...this.hierarchialGraph.nodes, this.nextNodeConfiguration.node];
    } else {
      const newNode = {
        id: 'start',
        label: this.newNodeLabel
      };

      this.hierarchialGraph.nodes = [...this.hierarchialGraph.nodes, newNode];
      this.isNewGraph = false;
    }

    this.newNodeLabel = '';
    this.showNodeCreationDialog = false;
    this.graphUri = this.generateDownloadJsonUri(this.hierarchialGraph);
  }
}
