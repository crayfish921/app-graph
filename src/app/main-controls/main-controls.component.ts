import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { pieChart } from '../models';

export interface CurrentView {
  pieChart: boolean;
  graph: boolean;
}

@Component({
  selector: 'app-main-controls',
  templateUrl: './main-controls.component.html',
  styleUrls: ['./main-controls.component.scss']
})
export class MainControlsComponent implements OnInit {

  constructor() { }

  currentView: CurrentView = {
    graph: false,
    pieChart: false
  };

  @Input() graphUri;
  @Input() pieChartUri;

  @Output() newGraph = new EventEmitter();
  @Output() newPieChart = new EventEmitter();
  @Output() currentViewStatus = new EventEmitter();

  ngOnInit() {
    this.currentView.pieChart = true;
  }

  newGraphClick() {
    this.newGraph.emit(true);
  }

  newPieChartClick() {
    this.newPieChart.emit(true);
  }

  changeToPieChartView() {
    this.currentView.pieChart = true;
    this.currentView.graph = false;

    this.currentViewStatus.emit(this.currentView);
  }

  changeToGraphView() {
    this.currentView.graph = true;
    this.currentView.pieChart = false;

    this.currentViewStatus.emit(this.currentView);
  }

}
