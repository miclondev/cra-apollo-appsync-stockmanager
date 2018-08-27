import React, { Component } from 'react';
import { Segment, Button, Divider, Form, Checkbox, Input, Label, Dropdown } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import constants from '../../config/constants';
import { graphql, compose } from 'react-apollo';
import uuidv1 from 'uuid/v1';

//mutations and queries
import addNewProduct from '../../mutations/addNewProduct'
import userProducts from '../../queries/getAllUserProducts';
import getCategories from '../../queries/getProductCategories';

class NewProduct extends Component {

    static defaultProps = {
        categories: []
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: false, 
            title: "",
            description: "",
            category: "43534-534-534-5342-TSD", 
            initial_cost: 0, 
            stock: true,
            inStock: 1, 
            price: 0,
            store_id: constants.store_id,
            retail: 0, wholesale: 0, offer: 0,
            //checks
            isWholesale: false, isOffer: false
        }
    }

    handleAdd = async (e) => {
        this.setState({ loading: true })
        e.preventDefault();
        const { createProduct } = this.props;
        const { title, description, category, initial_cost, inStock, stock, retail, wholesale, offer } = this.state

        await createProduct({
            title, initial_cost, category, description,
            stock: stock ? inStock : 0,
            store_id: constants.store_id,
            retail, wholesale, offer
        })

        this.setState({ loading: false })
        this.props.history.push('/dashboard/products')
    }

    render() {
        console.log(this.props)

        const options = Array.from(this.props.categories, cat => ({
            key: cat.category_id, value:cat.category_id, text: cat.cat_name
        }))
        options.unshift({ key: "General", value: "43534-534-534-5342-TSD", text: "General"})
         

        return (
            <div className="right">
                <Segment>
                    <div className="products-header">
                        <Link to="/dashboard/products">
                            <Button> Go back </Button>
                        </Link>
                        <h4> Add Product </h4>
                    </div>
                    <Divider section />

                    
                    <div className="add-product-form">
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

                            <Form.Field>
                                <label>Choose Category</label>
                                <Dropdown
                                    placeholder="General Category"
                                    selection
                                    options={options}
                                    onChange={(e, { value }) => this.setState({ category: value })}
                                />
                            </Form.Field>

                            <Form.Group widths='equal' className="left-center-flex">

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



                            <Form.Field inline className="">
                                <label>Product Initial Cost</label>
                                <input
                                    placeholder='enter cost'
                                    value={this.state.initial_cost}
                                    onChange={e => this.setState({ initial_cost: e.target.value })}
                                    type='number'
                                    width={2}
                                />
                                <Label pointing='left'>you can add additional costs later</Label>
                            </Form.Field>


                            <Form.Field inline className="product-price-input">
                                <label>Retail Price</label>
                                <input
                                    placeholder='enter cost'
                                    value={this.state.retail}
                                    onChange={e => this.setState({ retail: e.target.value })}
                                    type='number'
                                    width={2}
                                />
                            </Form.Field>
                            {
                                this.state.isWholesale ?
                                    <Form.Field inline className="product-price-input">
                                        <label>Wholesale Price</label>
                                        <input
                                            placeholder='enter cost'
                                            value={this.state.wholesale}
                                            onChange={e => this.setState({ wholesale: e.target.value })}
                                            type='number'
                                            width={2}
                                        />
                                    </Form.Field>

                                    : <a onClick={() => this.setState({ isWholesale: true })}> Add wholesale price </a>
                            }

                            {
                                this.state.isOffer ?
                                    <Form.Field inline className="product-price-input">
                                        <label>Offer Price</label>
                                        <input
                                            placeholder='enter cost'
                                            value={this.state.offer}
                                            onChange={e => this.setState({ offer: e.target.value })}
                                            type='number'
                                            width={2}
                                        />
                                    </Form.Field>
                                    : <div> <a onClick={() => this.setState({ isOffer: true })}> Add offer price </a></div>
                            }

                            <Button type='submit' fluid loading={this.state.loading}>Add Product</Button>
                        </Form>
                    </div>
                </Segment>
            </div>
        )
    }
}

export default compose(
    graphql(addNewProduct, {
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
                            ...product,
                            product_id: uuidv1(),
                            __typename: 'Product',
                            created_on: Date.now()
                        }
                    })
                })
            }
        }),
        options: {
            refetchQueries: [{ query: userProducts }],
        }
    }),
    graphql(getCategories, {
        options: (props) => ({
                variables: {
                    store_id: constants.store_id
                },
                fetchPolicy: 'cache-first'
        }),
        props: props => ({
            categories: props.data.listCategoriesStoreId ? props.data.listCategoriesStoreId.items : []
        })
    })
)(withRouter(NewProduct))

