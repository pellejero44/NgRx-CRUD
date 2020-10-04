import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Store} from '@ngrx/store';
import {ProducState} from '../../store/product.reducer';
import {addProduct} from '../../store/product.actions';

@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.scss"]
})
export class ProductAddComponent implements OnInit {
  constructor(private store: Store<ProducState>) {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    this.store.dispatch(addProduct({product: f.value}));
    // const productObserver = {
    //   next: product => (
    //     this.router.navigate(["/product/list"]), console.log("success")
    //   ),
    //   error: err => console.error(err)
    // };

    // this.productService.createProduct(f.value).subscribe(productObserver);
  }
}
