import React, { Component } from 'react';
import { Segment, List, Divider, Icon, Button } from 'semantic-ui-react';
import { graphql, compose } from 'react-apollo';

//queries and mutations
//import getProducts from '../queries/getProducts';
import userProducts from '../queries/getAllUserProducts';
import getCategories from '../queries/getProductCategories';

//components
import SingleListProduct from './product/SigleListProduct';
//import AddNewModal from './products/AddNewModal';
import SearchProducts from './products/SearchProducts';
import ShowInStock from './products/ShowInStock';
import FilterProducts from './products/FilterProducts';

import constants from '../config/constants';

import { Link } from 'react-router-dom';

//import { withAuthenticator } from 'aws-amplify-react';

class Products extends Component {

  static defaultProps = {
    categories: [],
    products: [],
    network: 1
  }

  renderProducts = () => {
    //console.log(this.props)
    const { products } = this.props
    return products.map(product => {
      return (
        <SingleListProduct
          product={product}
          key={product.product_id}
        />
      )
    })
  }

  render() {

    // if (this.props.authState !== "signedIn") {
    //   //checked signed in
    //   return <div> Loading .... </div>
    // }

    //console.log(this.props)

    return (
      <div className="right">
        
        <Segment>
          <div className="products-header">
            <Icon bordered size="large" name="barcode" />
            <FilterProducts categories={this.props.categories} />
            <ShowInStock />
            <SearchProducts />
            <Link to="/dashboard/products/new">
              <Button primary>
                  New Product
              </Button>
              </Link>
          </div>
          <Divider section />
          <List divided>
            {
              this.renderProducts()
            }
          </List>
        </Segment>
        {this.props.network < 7 && <div>Loading ...</div>}
      </div>
    );
  }
}


export default compose(
  graphql(userProducts, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => {
      //console.log('this is', props)
      return {
        products: props.data.listProductsFromUser ? props.data.listProductsFromUser.items : [],
        network: props.data.networkStatus
      }
    }
  }),
  graphql(getCategories, {
    options: (props) => {
      //console.log('before option props', props)
      return {
        variables: {
          store_id: constants.store_id
        },
        fetchPolicy: 'cache-and-network'
      }
    },
    props: props => {
      //console.log('after props', props)
      return {
        categories: props.data.listCategoriesStoreId ? props.data.listCategoriesStoreId.items : []
      }
    }
  })
)(Products)