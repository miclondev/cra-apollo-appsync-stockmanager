import React, { Component } from 'react'
import { Button, Modal, Form, Checkbox } from 'semantic-ui-react'
import constants from '../../config/constants';
import { graphql, compose } from 'react-apollo';
import { graphqlMutation } from 'aws-appsync-react';
import addNewProduct from '../../mutations/addNewProduct'
import userProducts from '../../queries/getAllUserProducts';

class AddNewModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            title: "",
            description: "",
            store_id: constants.store_id,
            modal: false
        }
    }

    // onAddProduct = (e) => {
    //     e.preventDefault()
    //     const { title, description, store_id } = this.state;
    //    console.log(this.state)
    //    this.setState({ loading: true })
    //    this.props.createProduct({
    //        variables: { title, description, store_id} 
    //    }).catch(res => {
    //        console.log(res)
    //        this.setState({ loading: false })
    //    })
    // }

    addProduct = () => {
        this.setState({ loading: true })
        this.props.createProduct({
            title: this.state.title,
            store_id: constants.store_id,
            description: this.state.description
        })
        this.setState({ loading: false, modal: false })
    }

    render() {
        console.log(this.props)
        return (
            <div>
            
            <Button onClick={() => this.setState({ modal: true })}> 
              Add New Product 
              </Button>
            <Modal open={this.state.modal} size="tiny">
                <Modal.Header>Enter Product Details</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.addProduct} loading={this.state.loading}>
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
                        <Form.Field>
                            <Checkbox label='Available' checked />
                        </Form.Field>
                        <Button type='submit'>Add Product</Button>
                    </Form>
                </Modal.Content>
            </Modal>
            </div>
        )
    }
}
// export default graphql(addNewProduct)(AddNewModal)

export default graphqlMutation(addNewProduct, userProducts , 'Product')(AddNewModal)