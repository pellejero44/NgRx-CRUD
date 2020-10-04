import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const productsModule = () => import('../app/products/products.module').then(m => m.ProductsModule);

const routes: Routes = [
  {
    path: 'product',
    loadChildren: productsModule
  },
  { path: '', redirectTo: 'product', pathMatch: 'full' },
  { path: '**', redirectTo: 'product', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
