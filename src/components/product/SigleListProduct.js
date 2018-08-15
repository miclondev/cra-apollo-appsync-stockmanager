import React from 'react';
import { Image, Button, Icon, Divider, Label } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Product = (props) => (
  <div key={props.id} className="single-list-product">
    <div className="info">
      <Link to={`/dashboard/products/${props.id}`}>
        <Image avatar src='/images/avatar/small/lena.png' />
        <p>{props.title}</p>
      </Link>
      <div className="labels">
        {props.stock && props.stock > 0 ?
           <Label basic color='blue'> {props.stock} In Stock</Label> 
           : <Label basic color='red'>Out Of Stock</Label>
          }
        <Label basic color='blue'>
          added {moment(props.date).format('D/MMM/YY')}
        </Label>
      </div>
    </div>
    <div className="action">

      <Button>Sell</Button>
      <Button> Add Stock</Button>
      <Button icon> <Icon name='edit outline' /></Button>
      <Button>Info</Button>

    </div>
    <Divider />
  </div>
)

export default Product