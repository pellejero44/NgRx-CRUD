import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, } from '@angular/router';
import {Observable} from 'rxjs';
import {Product} from '../../models/product';
import {ProducState} from '../../store/product.reducer';
import {select, Store} from '@ngrx/store';
import {selectedProduct} from '../../store/product.selector';
import * as fromActions from '../../store/product.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product$: Observable<Product>;

  constructor(
    private store: Store<ProducState>,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.store.dispatch(
      fromActions.loadProduct({id: this.route.snapshot.paramMap.get('id')})
    );
    this.product$ = this.store.pipe(select(selectedProduct));
    // this.product$ = this.service.getProduct(
    //   this.route.snapshot.paramMap.get('id')
    // );
  }

  deleteProduct(id: string) {
    this.store.dispatch(fromActions.deleteProduct({id}));
    // const productsObserver = {
    //   next: () => {
    //     console.log('Product Deleted');
    //     this.router.navigate(['/product/list']);
    //   },
    //   error: err => console.error(err)
    // };
    // this.service.deleteProduct(id).subscribe(productsObserver);
  }
}
