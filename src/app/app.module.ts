import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './core/layout/layout.module';
import { ProductListComponent } from './modules/products/pages/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReportComponent } from './modules/products/pages/report/report.component';
import { HistoryComponent } from './modules/products/pages/history/history.component';
import { PurchaseComponent } from './modules/products/pages/purchase/purchase.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule } from 'ngx-cookie';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ReportComponent,
    HistoryComponent,
    PurchaseComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    CookieModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
