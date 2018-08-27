import React, { Component } from 'react';
import { Button, Dropdown, Modal, Input } from 'semantic-ui-react';
import constants from '../../config/constants';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import sellProductMutation from '../../mutations/sellProduct';
import userProducts from '../../queries/getAllUserProducts';

import _ from 'lodash';

class sellProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            custom: false,
            active: 'retail',
            showInput: false,
            errors: [],
            modal: false,
            count: 1,
            selling_price: 0,
            tax: 0
        }
    }

    open = () => this.setState({ modal: true })
    close = () => this.setState({ modal: false })


    onSellProduct = (e) => {
        e.preventDefault()
        
        const { createSale } = this.props
        const { product_id, stock, initial_cost, retail } = this.props.product;
        const { selling_price, tax, count } = this.state;

        //const total_with_tax = (count * selling_price) - tax;
        //const total_without_tax = count * selling_price
       let sellPrice = selling_price === 0 ? retail : selling_price

        console.log(this.state)
        createSale({
            product_id,
            product_price: initial_cost,
            shop_id: constants.store_id,
            stock: stock - count,
            selling_price: sellPrice,
            tax,
            count: parseInt(count)
        })
        this.setState({ modal: false , count: 1, selling_price: 0, tax: 0 })
    }

    handlePriceClick = (e, { name }) => {
        console.log(name)
        const { retail, wholesale, offer } = this.props.product
        let price = 0;
        let custom = false;

        if(name === 'retail') price = retail 
        else if(name === 'wholesale') price = wholesale
        else if(name === 'offer') price = offer 
        else if(name == 'custom') custom = true
        else price = 0

        return this.setState({ active: name, selling_price : price, custom })
    }

    render() {
         console.log('sell props', this.props)
        //console.log('sell state', this.state)

        return (
            <div>

                <Modal
                    open={this.state.modal}
                    onOpen={this.open}
                    onClose={this.close}
                    size='small'
                >
                    <Modal.Header>Quick Sell {this.props.product.title} </Modal.Header>
                    <Modal.Content>
                        <div className="center-with-flex">

                            <Button basic
                                size={this.state.active === 'retail' ? 'huge' : 'medium'}
                                color={this.state.active === 'retail' ? 'olive' : 'grey'}
                                onClick={this.handlePriceClick}
                                name="retail">
                                Retail
                        </Button>

                            <Button basic
                                size={this.state.active === 'wholesale' ? 'huge' : 'medium'}
                                color={this.state.active === 'wholesale' ? 'olive' : 'grey'}
                                onClick={this.handlePriceClick}
                                name="wholesale">
                                WholeSale
                        </Button>

                            <Button
                                basic
                                size={this.state.active === 'offer' ? 'huge' : 'medium'}
                                color={this.state.active === 'offer' ? 'olive' : 'grey'}
                                onClick={this.handlePriceClick}
                                name="offer">
                                Offer
                        </Button>

                            <Button basic
                                size={this.state.active === 'custom' ? 'huge' : 'medium'}
                                color={this.state.active === 'custom' ? 'olive' : 'grey'}
                                onClick={this.handlePriceClick}
                                name="custom">
                                Custom Price
                        </Button>

                        </div>

                        { this.state.custom ?
                         <div>  Enter Custom Price <Input/> </div> :
                        <h3>
                            Price : {this.state.selling_price !== 0 ? this.state.selling_price : this.props.product.retail}
                        </h3>
                      }

                        <div>
                        How many
                            <Input
                                type="number"
                                width={2}
                                value={this.state.count || 1}
                                onChange={
                                    (e) => {
                                        console.log(e.target.value)
                                        if (e.target.value <= this.props.product.stock) {
                                            this.setState({ count: e.target.value  })
                                        } else {
                                            this.setState((prevState) => {
                                                prevState.errors.push({ stock: 'you cant sell more than stock' })
                                            })
                                        }
                                    }
                                }
                            />
                            <p>
                                Available {this.props.product.stock}
                            </p>
                        </div>
                        <p>
                                Total : {
                                    this.state.selling_price !== 0 ?
                                    this.state.count * this.state.selling_price
                                    : this.state.count * this.props.product.retail
                                }
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button icon='check' content='Make a Sell' onClick={this.onSellProduct} size="big" positive/>
                    </Modal.Actions>
                </Modal>


                <Dropdown text='Sell'>
                    <Dropdown.Menu>
                        <Dropdown.Item text='Quick Sell' description='Sell Anonymously' onClick={this.open} />
                        <Dropdown.Divider />

                        <Dropdown.Item
                            text='Make Order'
                            description='Sell to customer'
                            onClick={() => this.props.history.push(`/dashboard/products/create-order/${this.props.product.product_id}`)} 
                        />

                    </Dropdown.Menu>
                </Dropdown>
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
                    console.log('data', data.listProductsFromUser.items)
                    //console.log('sale',createSale)
                    console.log('product', product)

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
})(withRouter(sellProduct));