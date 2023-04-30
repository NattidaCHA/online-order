import { NgModule } from '@angular/core';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
// import { SharedModule } from '../../shared/shared.module';
// import { MaterialModule } from 'src/app/shared/material.module';
// import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    ContentComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
  ],
  imports: [
    // SharedModule,
    RouterModule,
    // MaterialModule,
    // TranslocoModule,
  ],
})
export class LayoutModule {}
