import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {select, Store} from '@ngrx/store';
import {ProducState} from '../../store/product.reducer';
import * as fromActions from '../../store/product.actions';
import {selectProducts} from '../../store/product.selector';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  // products: Product[] = [];
  products$: Observable<Product[]>;

  constructor(private store: Store<ProducState>) {}

  ngOnInit() {
    this.store.dispatch(fromActions.loadProducts());
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.store.pipe(select(selectProducts));
    // const productsObserver = {
    //   next: products => (this.products = products),
    //   error: err => console.error(err)
    // };

    // this.productService.getProducts().subscribe(productsObserver);
  }

  deleteProduct(id: string) {
    this.store.dispatch(fromActions.deleteProduct({id}));
    // const productsObserver = {
    //   next: () => {
    //     console.log('Product Deleted');
    //     this.ngOnInit();
    //   },
    //   error: err => console.error(err)
    // };
    // this.productService.deleteProduct(id).subscribe(productsObserver);
  }
}
