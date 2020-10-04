import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProducState} from '../../store/product.reducer';
import {select, Store} from '@ngrx/store';
import {loadProduct, updateProduct} from '../../store/product.actions';
import {Observable} from 'rxjs';
import {selectedProduct} from '../../store/product.selector';
import {Update} from '@ngrx/entity';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  constructor(
    private store: Store<ProducState>,
    private route: ActivatedRoute,
  ) {}

  model: any = {};

  ngOnInit() {
    this.store.dispatch(
      loadProduct({id: this.route.snapshot.paramMap.get('id')})
    );

    this.store.pipe(select(selectedProduct)).subscribe(product => {
      this.model = Object.assign(new Product(), product);
    });

    // this.service
    //   .getProduct(this.route.snapshot.paramMap.get('id'))
    //   .subscribe(product => (this.model = product));
  }

  onSubmit() {
    const update: Update<Product> = {
      id: this.model.id,
      changes: this.model
    };

    this.store.dispatch(updateProduct({product: update}));

    // const productObserver = {
    //   next: product => {
    //     this.router.navigate(['/product/list']), console.log('success');
    //   },
    //   error: err => console.error(err)
    // };
    // console.log(this.model);
    // this.service.editProduct(this.model).subscribe(productObserver);
  }
}
