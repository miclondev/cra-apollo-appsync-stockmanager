import React from 'react';
import { Image, Button, Icon, Divider, Label } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import SellProduct from './SellProduct';

const Product = (props) => (
  <div key={props.product_id} className="single-list-product">
    <div className="info">
      <Link to={`/dashboard/products/${props.product_id}`}>
        <Image avatar src='/images/avatar/small/lena.png' />
        <p>{props.title}</p>
      </Link>
      <div className="labels">
        {props.stock && props.stock > 0 ?
           <Label basic color='blue'> {props.stock} In Stock</Label> 
           : <Label basic color='red'>Out Of Stock</Label>
          }
        <Label basic color='blue'>
          added {moment(props.created_on).format('D/MMM/YY')}
        </Label>
      </div>
    </div>
    <div className="action">

    { props.stock > 0 &&  <SellProduct product={props.product}/>}
      <Button> Add Stock</Button>
      <Button icon> <Icon name='edit outline' /></Button>
      <Button>Info</Button>

    </div>
    <Divider />
  </div>
)

export default Product