import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import constants from '../../config/constants'

import { graphql } from 'react-apollo';
import sellProductMutation from '../../mutations/sellProduct';
import userProducts from '../../queries/getAllUserProducts';

import _ from 'lodash';

class sellProduct extends Component {

    constructor(props) {
        super(props)
        //console.log(props)
        this.state = {
            showInput: false,
            product: {
                selling_price: 95000,
                tax: 0,
            }
        }
    }

    onSellProduct = (e) => {
        e.preventDefault()
        console.log('starting sale')
        const { createSale } = this.props
        const { product_id, stock } = this.props.product;
        const { selling_price, tax } = this.state.product;

        createSale({
            product_id,
            product_price: 40000,
            shop_id: constants.store_id,
            stock: stock - 1,
            selling_price,
            tax
        })
    }

    render() {
        console.log('sell props', this.props)
        //console.log('sell state', this.state)
        
        return (
            <div>
                <Button onClick={e => this.onSellProduct(e) }> Sell</Button>
                {this.state.showInput && <Input />}
            </div>
        )
    }
}

export default graphql(sellProductMutation, {
    props: (props) => ({
        createSale: (product) => {
            props.mutate({
                update: (proxy, { data: { createSale } }) => {
                    const query = userProducts
                    const data = proxy.readQuery({ query })
                    //const index = _.findIndex(data.listProductsFromUser.items)
                    console.log('data',data.listProductsFromUser.items)
                    console.log('sale',createSale)
                    console.log('product',product)

                    data.listProductsFromUser.items.find(prod => prod.product_id === product.product_id).stock = product.stock
                    proxy.writeQuery({ query, data })
                },
                variables: product,
                optimisticResponse: () => ({
                    sellProduct: {
                        response: 'done',
                        __typename: 'Product'
                     },
                     updateProduct: {
                         stock: product.stock,
                         product_id: product.product_id,
                         __typename: 'Product'
                     }
                })
            })
        }
    })
})(sellProduct);