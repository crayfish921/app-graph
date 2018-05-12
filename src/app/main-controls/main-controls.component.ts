import { Component, OnInit, EventEmitter, Output } from '@angular/core';

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

  @Output() newGraph = new EventEmitter();

  ngOnInit() {
    this.currentView.graph = true;
  }

  newGraphClick() {
    this.newGraph.emit(true);
  }

}
