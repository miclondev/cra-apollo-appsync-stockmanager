import React from 'react';
import { Image, Button, Icon, Divider, Label } from 'semantic-ui-react';
//import moment from 'moment';
import { Link } from 'react-router-dom';
import SellProduct from './SellProduct';

const Product = ({ product }) => (
  <div key={product.product_id} className="single-list-product">
    <div className="info">
      <Link to={`/dashboard/products/${product.product_id}`}>
        <Image avatar src='/images/avatar/small/lena.png' />
        <p>{product.title}</p>
      </Link>
      <div className="labels">
        {product.stock && product.stock > 0 ?
          <Label basic color='blue'> {product.stock} In Stock</Label>
          : <Label basic color='red'>Out Of Stock</Label>
        }
        
      </div>
    </div>
    <div className="action">

      {product.stock > 0 && <SellProduct product={product} />}
      <Button> Add Stock</Button>
      <Button icon> <Icon name='edit outline' /></Button>
      <Button>Info</Button>

    </div>
    <Divider />
  </div>
)

// <Label basic color='blue'>
//  added {moment(product.created_on).format('D/MMM/YY')}
//   </Label>

export default Product