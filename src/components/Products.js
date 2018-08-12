import React, { Component } from 'react';
import { Segment, List } from 'semantic-ui-react';
import { graphql, compose, withApollo } from 'react-apollo';
import getProducts from '../queries/getProducts';
import userProducts from '../queries/getAllUserProducts';
import SingleListProduct from './product/SigleListProduct';
import AddNewModal from './products/AddNewModal';
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
    this.setState({ budy: true })
    await client.query({
      query,
      fetchPolicy: 'network-only'
    })
    this.setState({ busy: false })
  }

  render() {
      if (this.props.data.loading) {
        return <div>loading ......</div>
    }

    console.log(this.props)

    return (
      <div className="right">
        <Segment>
          <div>
            <AddNewModal />
          </div>
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

export default withAuthenticator(graphql(userProducts,{
  options: (props) => { return { variables: { user_id: props.authData.username }}}
})(Products));