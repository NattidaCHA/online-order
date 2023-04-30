import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './core/layout/layout.module';
import { ProductListComponent } from './modules/products/pages/product-list/product-list.component';
import { CardListComponent } from './modules/products/components/card-list/card-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReportComponent } from './modules/products/pages/report/report.component';
import { ActualTargetChartComponent } from './modules/products/components/actual-target-chart/actual-target-chart.component';
import { GrowthChartComponent } from './modules/products/components/growth-chart/growth-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CardListComponent,
    ReportComponent,
    ActualTargetChartComponent,
    GrowthChartComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    LayoutModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
