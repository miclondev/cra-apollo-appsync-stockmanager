import React, { Component } from 'react';
import { Segment, List, Divider, Icon } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import getProducts from '../queries/getProducts';
import userProducts from '../queries/getAllUserProducts';
import SingleListProduct from './product/SigleListProduct';

import AddNewModal from './products/AddNewModal';
import SearchProducts from './products/SearchProducts';
import ShowInStock from './products/ShowInStock';
import FilterProducts from './products/FilterProducts';

import { withAuthenticator } from 'aws-amplify-react';


class Products extends Component {

  static defaultProps = {
    products: [],
    network: 1
  }

  renderProducts = () => {
    //console.log(this.props)
    const { products } = this.props
    return products.map(({ title, product_id, created_on, stock }) => {
      return (
        <SingleListProduct
          title={title}
          id={product_id}
          key={product_id}
          date={created_on}
          stock={stock}
        />
      )
    })
  }

  render() {

    if (this.props.authState !== "signedIn") {
      //checked signed in
      return <div> Loading .... </div>
    }

    console.log(this.props)

    return (
      <div className="right">
        {this.props.network < 7 && <div>Loading ...</div>}
        <Segment>
          <div className="products-header">
            <Icon bordered size="large" name="barcode" />
            <FilterProducts />
            <ShowInStock />
            <SearchProducts />
            <AddNewModal />
          </div>
          <Divider section />
          <List divided>
            {
              this.renderProducts()
            }
          </List>
        </Segment>
      </div>
    );
  }
}


export default withAuthenticator(
  graphql(userProducts, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => {
      console.log('this is', props)
      return {
        products: props.data.listProductsFromUser ? props.data.listProductsFromUser.items : [],
        network: props.data.networkStatus
      }
    }
  })(Products))