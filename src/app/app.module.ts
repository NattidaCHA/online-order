import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './core/layout/layout.module';
import { ProductListComponent } from './modules/products/pages/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReportComponent } from './modules/products/pages/report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ReportComponent,
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
