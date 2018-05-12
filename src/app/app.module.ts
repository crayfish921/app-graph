import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import {CardModule} from 'primeng/card';

import { AppComponent } from './app.component';
import { MainControlsComponent } from './main-controls/main-controls.component';
import { MainViewComponent } from './main-view/main-view.component';


@NgModule({
  declarations: [
    AppComponent,
    MainControlsComponent,
    MainViewComponent
  ],
  imports: [
    BrowserModule,
    NgxGraphModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ToolbarModule,
    ButtonModule,
    MenuModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
