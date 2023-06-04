import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { ProductListComponent } from './modules/products/pages/product-list/product-list.component';
import { ReportComponent } from './modules/products/pages/report/report.component';
import { PurchaseComponent } from './modules/products/pages/purchase/purchase.component';
import { HistoryComponent } from './modules/products/pages/history/history.component';
import { ListResolver } from './modules/products/pages/purchase/purchase.resolvers';

const childrenRoute = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'report',
    component: ReportComponent,
  },
  {
    path: 'purchase',
    resolve: {
      listResolver: ListResolver,
    },
    component: PurchaseComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
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
