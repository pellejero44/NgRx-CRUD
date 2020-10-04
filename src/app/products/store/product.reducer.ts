import {Action, createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import * as ProductActions from './product.actions';
import {Product} from '../models/product';

export const productsFeatureKey = 'products';

export interface ProducState extends EntityState<Product> {
  // additional entities state propertiese
  error: any;
  selectedProduct: Product;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: ProducState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedProduct: undefined
});

const productReducer = createReducer(
  initialState,
  on(ProductActions.addProduct,
    (state, action) => adapter.addOne(action.product, state)
  ),
  on(ProductActions.addProductSucces,
    (state, action) => adapter.addOne(action.product, state)
  ),
  on(ProductActions.addProductFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(ProductActions.loadProductsSuccess,
    (state, action) => adapter.addAll(action.products, state)
  ),
  on(ProductActions.loadProductsFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(ProductActions.loadProductSuccess,
    (state, action) => {
      return {
        ...state,
        selectedProduct: action.selectedProduct
      };
    }
  ),
  on(ProductActions.loadProductFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(ProductActions.upsertProduct,
    (state, action) => adapter.upsertOne(action.product, state)
  ),
  on(ProductActions.addProducts,
    (state, action) => adapter.addMany(action.products, state)
  ),
  on(ProductActions.upsertProducts,
    (state, action) => adapter.upsertMany(action.products, state)
  ),
  on(ProductActions.updateProduct,
    (state, action) => adapter.updateOne(action.product, state)
  ),
  on(ProductActions.updateProducts,
    (state, action) => adapter.updateMany(action.products, state)
  ),
  // on(ProductActions.deleteProduct,
  //   (state, action) => adapter.removeOne(action.id, state)
  // ),
  on(ProductActions.deleteProductSucces,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ProductActions.deleteProductFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(ProductActions.deleteProducts,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ProductActions.clearProducts,
    state => adapter.removeAll(state)
  ),
);

export function reducer(state: ProducState | undefined, action: Action) {
  return productReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
