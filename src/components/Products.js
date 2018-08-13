import React, { Component } from 'react';
import { Segment, List, Divider, Icon } from 'semantic-ui-react';
import { graphql, compose, withApollo } from 'react-apollo';
import getProducts from '../queries/getProducts';
import userProducts from '../queries/getAllUserProducts';
import SingleListProduct from './product/SigleListProduct';

import AddNewModal from './products/AddNewModal';
import SearchProducts from './products/SearchProducts';
import ShowInStock from './products/ShowInStock';
import FilterProducts from './products/FilterProducts';

import { withAuthenticator } from 'aws-amplify-react';


class Products extends Component {

  renderProducts = () => {
    console.log(this.props)
    const { listProductsFromUser } = this.props.data
    return listProductsFromUser.items.map(({ title, product_id }) => {
      return (
        <SingleListProduct title={title} id={product_id} key={product_id} />
      )
    })
  }

  handleSync = async () => {
    const { client } = this.props
    const query = getProducts
    this.setState({ busy: true })
    await client.query({
      query,
      fetchPolicy: 'network-only'
    })
    this.setState({ busy: false })
  }

  render() {

    if (this.props.authState !== "signedIn") {
      return <div> Loading .... </div>
    }
    if (this.props.data.loading) {
      return <div>loading ......</div>
    }

    console.log(this.props)

    return (
      <div className="right">
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
              //  this.renderProducts()
            }
          </List>
        </Segment>
      </div>
    );
  }
}

export default withAuthenticator(
  graphql(userProducts,
    {
      options: ({ authData }) =>
        ({
          variables: { user_id: authData.username }
        }
        ),
      fetchPolicy: 'cache-first'
    })(Products)
);