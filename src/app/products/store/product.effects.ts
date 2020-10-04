import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, concatMap, map, mergeMap, tap} from 'rxjs/operators';
import {ProductService} from '../services/product.service';
import * as fromProductAction from './product.actions';
import {Router} from '@angular/router';

@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
    private productService: ProductService) {}

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(fromProductAction.loadProducts),
    mergeMap(() => this.productService.getProducts().pipe(
      map(products => fromProductAction.loadProductsSuccess({products})),
      catchError(error => of(fromProductAction.loadProductsFailure({error})))
    ))
  ));

  loadProduct$ = createEffect(() => this.actions$.pipe(
    ofType(fromProductAction.loadProduct),
    mergeMap(action => this.productService.getProduct(action.id).pipe(
      map(product => fromProductAction.loadProductSuccess({selectedProduct: product})),
      catchError(error => of(fromProductAction.loadProductFailure({error})))
    ))
  ));

  createProduct$ = createEffect(() => this.actions$.pipe(
    ofType(fromProductAction.addProduct),
    mergeMap(action => this.productService.createProduct(action.product).pipe(
      map(product => fromProductAction.addProductSucces({product})),
      catchError(error => of(fromProductAction.addProductFailure({error})))
    )
    ),
    tap(() => this.router.navigate(['/product/list']))
  ));

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(fromProductAction.addProduct),
    concatMap(action =>
      this.productService.editProduct(
        action.product.id,
        action.product.changes
      )
    ),
    tap(() => this.router.navigate(['/product/list']))
  ),
    {dispatch: false} // because I don't want to dispatch another effect
  );

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(fromProductAction.deleteProduct),
    mergeMap(action => this.productService.deleteProduct(action.id).pipe(
      map(() => fromProductAction.deleteProductSucces({id: action.id})),
      catchError(error => of(fromProductAction.deleteProductFailure({error})))
    )
    ),
    tap(() => this.router.navigate(['/product/list']))
  ));

}
