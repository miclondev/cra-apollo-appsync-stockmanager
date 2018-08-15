import React, { Component } from 'react'
import { Button, Modal, Form, Checkbox, Input, Label } from 'semantic-ui-react'
import constants from '../../config/constants';
import { graphql } from 'react-apollo';
//import { graphqlMutation } from 'aws-appsync-react';
import addNewProduct from '../../mutations/addNewProduct'
import userProducts from '../../queries/getAllUserProducts';
import  uuidv1 from 'uuid/v1';

class AddNewModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            title: "",
            description: "",
            category: "43534-534-534-5342-TSD",
            cost: 0,
            stock: true,
            inStock: 1,
            price: 0,
            selling_price: 0,
            store_id: constants.store_id,
            modal: false
        }
    }

    handleAdd = async (e) => {
        //e.stopPropagation();
        this.setState({ loading: true })
        e.preventDefault();
        const { createProduct } = this.props;
        const { title, description, category, cost, inStock, selling_price, stock } = this.state
        
        await createProduct({
            title, cost, category, description,
            stock: stock ? inStock : 0,
            store_id: constants.store_id,
            selling_price
        })
        this.setState({ loading: false, modal: false })
    }

    close = () => this.setState({ modal: false })

    render() {
        console.log(this.props)
        return (
            <div>

                <Button primary onClick={() => this.setState({ modal: true })}>
                    New Product
               </Button>
                <Modal open={this.state.modal} size="tiny" onClose={this.close}>
                    <Modal.Header>Enter Product Details</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleAdd} loading={this.state.loading}>
                            <Form.Field>
                                <label>Product Title</label>
                                <input
                                    placeholder='enter title'
                                    value={this.state.title}
                                    onChange={e => this.setState({ title: e.target.value })}
                                />
                            </Form.Field>
                            <Form.TextArea label='Description'
                                placeholder='more description'
                                value={this.state.description}
                                onChange={e => this.setState({ description: e.target.value })}
                            />
                            <Form.Group widths='equal'>
                                <Checkbox
                                    onChange={() => this.setState({ stock: !this.state.stock })}
                                    label='In Stock'
                                    checked={this.state.stock}
                                />
                                {this.state.stock && <Input
                                    width={2}
                                    value={this.state.inStock}
                                    type='number'
                                    onChange={e => this.setState({ inStock: e.target.value })}
                                />}
                                {this.state.stock && <Label pointing='left'>How many products are in stock</Label>
                                }
                            </Form.Group>
                            <Form.Field>
                                <label>Product Initial Cost</label>
                                <input
                                    placeholder='enter cost'
                                    value={this.state.cost}
                                    onChange={e => this.setState({ cost: e.target.value })}
                                    type='number'
                                />
                                <Label pointing>you can add additional costs later</Label>
                            </Form.Field>
                            <Button type='submit'>Add Product</Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default graphql(addNewProduct, {
    props: (props) => ({
        createProduct: (product) => {
            props.mutate({
                update: (dataProxy, { data: { createProduct } }) => {
                    const query = userProducts
                    const data = dataProxy.readQuery({ query })
                    data.listProductsFromUser.items.unshift(createProduct)
                    dataProxy.writeQuery({ query, data })
                },
                variables: product,
                optimisticResponse: () => ({
                    createProduct: {
                        ...product, product_id: uuidv1(), __typename: 'Product', created_on: Date.now()
                    }
                })
            })
        }
    }),
    options: {
        refetchQueries: [{ query: userProducts }],
    }
})(AddNewModal)
