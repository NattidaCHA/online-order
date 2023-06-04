import { NgModule } from '@angular/core';
import { ContentComponent } from './components/content/content.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    ContentComponent,
    HeaderComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
  ],
})
export class LayoutModule {}
