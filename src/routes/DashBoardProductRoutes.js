import React from 'react';
import { Route } from 'react-router-dom';
import ProductCategories from '../components/products/ProductCategories';
import AddNewProduct from '../components/products/NewProduct';
import MakeOrder from '../components/product/MakeOrder';
import Products from '../components/Products';

const DashBoardProductRoutes = ({ match }) => (
    <div>
      <Route path={`${match.url}/`} component={Products} exact />
      <Route path={`${match.url}/categories`} component={ProductCategories} />
      <Route path={`${match.url}/new`} component={AddNewProduct} />
      <Route path={`${match.url}/create-order/`} component={MakeOrder} />
      <Route path={`${match.url}/create-order/:id`} component={MakeOrder} />
    </div>
  )

  export default DashBoardProductRoutes;