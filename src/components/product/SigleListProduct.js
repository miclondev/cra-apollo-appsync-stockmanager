import React from 'react';
import { Image, Button, Icon, Divider } from 'semantic-ui-react';

const Product = (props) => (
  <div key={props.id} className="single-list-product">
    <div className="info">
      <Image avatar src='/images/avatar/small/lena.png' />
      <p>{props.title}</p>
    </div>
    <div className="action">
     
      <Button>Sell</Button>
      <Button>Buy</Button>
      <Button>Info</Button>
      <Button icon> <Icon name='edit outline' /></Button>
      
    </div>
    <Divider/>
  </div>
)

export default Product