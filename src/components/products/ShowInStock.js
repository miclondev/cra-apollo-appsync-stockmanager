import React, { Component } from 'react'
import { Checkbox, Form } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import query from '../../queries/getAllUserProducts'

class ShowInStock extends Component{
    constructor(props){
        super(props)
        this.state = {
            checked : false
        }
    }

    onchecked = () => {
        console.log('change checked')
        return this.setState({ checked: !this.state.checked })
    }

    render(){
        return (
            <Form>
                <Form.Field>
                    <Checkbox onChange={this.onchecked} label='Only In Stock' checked={this.state.checked} />
                </Form.Field>
            </Form>
        )
    }
} 

export default graphql(query)(ShowInStock);