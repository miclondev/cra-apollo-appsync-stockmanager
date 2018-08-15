import React, { Component } from 'react';
import { Segment, List, Image, Grid, Rail, Form, Button, Checkbox, Icon } from 'semantic-ui-react';
import constants from '../../config/constants';
import { compose, graphql } from 'react-apollo';

import addCategory from '../../mutations/addCategory';
import getCategories from '../../queries/getProductCategories';
import deleteCategory from '../../mutations/deleteCategory';
import uuidv1 from 'uuid/v1';

class ProductCategories extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cat_name: ''
        }
    }

    static defaultProps = {
        categories: []
    }

    renderCats = () => {
        const { categories } = this.props
        return categories.map((cat) => ((
            <div key={cat.category_id} className="category-item">
                <List.Content>
                    <List.Header > {cat.cat_name}</List.Header>
                </List.Content>
                <List.Content>
                <Button> <Icon name='edit' /></Button>
                <Button> <Icon name='delete' /></Button>
              </List.Content>
            </div>
        ))
        )
    }

    onAddCat = (e) => {
        e.preventDefault()
        const { createCategory } = this.props;
        const { cat_name } = this.state
        createCategory({
            cat_name,
            store_id: constants.store_id,
            cat_for: 'Products'
        })
        this.setState({ cat_name: ""})
    }

    async handleDeleteClick(event, e) {
        e.preventDefault();

        if (window.confirm(`Are you sure you want to delete event ${event.id}`)) {
            const { deleteCategory } = this.props;

            await deleteCategory(event);
        }
    }

    render() {
         console.log('cat', this.props)
        return (
            <div className="right">
                <Segment>
                    <div className="product-categories">
                        <div className='form'>
                            <Form size="big" onSubmit={this.onAddCat}>
                                <Form.Field>
                                    <label>Category Name</label>
                                    <input
                                        placeholder='Enter categoy name'
                                        value={this.state.cat_name}
                                        onChange={e => this.setState({ cat_name: e.target.value })}
                                    />
                                </Form.Field>


                                <Button fluid type='submit'>Add New Category</Button>
                            </Form>
                        </div>

                        <div className='categories'>
                            <p>all categories </p>

                            <List divided verticalAlign='middle'>

                                {this.renderCats()}
                            </List>

                        </div>

                    </div>
                </Segment>

            </div>
        )
    }
}

export default compose(
    graphql(getCategories, {
        options: (props) => {
            console.log('before option props',props)
            return {
                variables: {
                 store_id: constants.store_id 
                },
                fetchPolicy: 'cache-and-network'
            }
        },
        props: props => {
            console.log('after props',props)
            return {
                categories: props.data.listCategoriesStoreId ? props.data.listCategoriesStoreId.items : []
            }
        }
    }),
    graphql(addCategory, 
        {
        props: (props) => ({
            createCategory: (category) => {
               return props.mutate({
                    update: (proxy, { data: { createCategory } }) => {
                        const query = getCategories
                        const data = proxy.readQuery({ query,
                        variables: { store_id: constants.store_id }
                        })

                        data.listCategoriesStoreId.items.unshift(createCategory)
                        proxy.writeQuery({ query,variables:{ store_id: constants.store_id }, data })
                    },
                    variables: category,
                    optimisticResponse: () => ({
                        createCategory: {
                            ...category, category_id: uuidv1(), __typename: 'Category'
                        }
                    })
                })
            }
        })
    }),

    ///change order of option and props
    graphql(deleteCategory,{
        name: 'delete',
        options: {
            update: (proxy, { data: { deleteCategory }}) => {
                const query = getCategories
                const data = proxy.readQuery({ query,
                variables: { store_id: constants.store_id }
                })
                data.listCategoriesStoreId.items.filter(cat => cat.id !== deleteCategory.category_id)
                proxy.writeQuery({ query,variables:{ store_id: constants.store_id }, data })
            },
            props: (props) => ({
                deleteCategory: (category) => {
                    return props.mutate({
                        variables: { category_id: category.category_id},
                        optimisticResponse: {
                            ...category,__typename: 'Category'
                        }
                    })
                }
            })
        }
    })
)(ProductCategories);