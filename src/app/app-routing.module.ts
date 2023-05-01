import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { ProductListComponent } from './modules/products/pages/product-list/product-list.component';
import { ReportComponent } from './modules/products/pages/report/report.component';

const childrenRoute = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'report',
    component: ReportComponent,
  },
];
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [...childrenRoute],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
