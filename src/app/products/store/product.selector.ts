import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProducState, productsFeatureKey, selectAll} from './product.reducer';

export const SelecProductState = createFeatureSelector<ProducState>(
    productsFeatureKey
);

export const selectProducts = createSelector(SelecProductState, selectAll);
export const selectedProduct = createSelector(SelecProductState, (state: ProducState) => state.selectedProduct);
