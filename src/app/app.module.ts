import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChoroplethMapComponent } from './choropleth-map/choropleth-map.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { AgeChartComponent } from './age-chart/age-chart.component';
import { SlopegraphComponent } from './slopegraph/slopegraph.component';
import { AlluvialDiagramComponent } from './alluvial-diagram/alluvial-diagram.component';
import { BubbleCloudComponent } from './bubble-cloud/bubble-cloud.component';

@NgModule({
  declarations: [
    AppComponent,
    ChoroplethMapComponent,
    LineChartComponent,
    AgeChartComponent,
    SlopegraphComponent,
    AlluvialDiagramComponent,
    BubbleCloudComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
