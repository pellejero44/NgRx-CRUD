# NGRX Guide
https://ngrx.io/guide/store

## Run application

Run `npm run dev` for running application.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Notes to remind

NgRx can be installed in this way
	 ng add @ngrx/store
	 ng add @ngrx/effects
	 ng add @ngrx/entity
	 ng add @ngrx/schematics
	 
generate an entity for a model:
	 ng generate entity products/store/product --module=../../products/products.module.ts =>
		- this will generate the action, the reducer, effects, etc
		- adapt the product reducer to use your name state and our module
		- create selector file: product.selector.ts and add the selectors needed
		
create an effect for a model: 
		ng generate effect products/store/product  --module=products/products.module.ts 

after all this, we can create  the success and failed actions, for that we need to change the reducer and action files and after that create the effects we want		
