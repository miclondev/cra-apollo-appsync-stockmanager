import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import addNewStore from '../../mutations/addNewStore';
import { graphql } from 'react-apollo';
import { withAuthenticator } from 'aws-amplify-react';
import { withRouter } from 'react-router-dom';

class AddStore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            title: "",
            description: ""
        }
    }

    addStore = (e) => {
        e.preventDefault()
        const { title, description } = this.state
        this.setState({ loading: true })
        console.log(this.props)
        this.props.mutate({
            variables: { title, description }
        })
            .then(res => {
                console.log('response', res)
                this.setState({
                    loading: false,
                    title: "",
                    description: ""
                })
                return this.props.history.push('/store')
            })
            .catch(err => console.log('err', err))
    }

    render() {
        console.log(this.props)
        return (
            <div className='add-store'>

                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 650 }}>
                        <Header as='h2' color='teal' textAlign='center'> Create New Store  </Header>
                        <h5>   With a new store you create a new dashboard </h5>
                        <Form onSubmit={this.addStore} size='large' loading={this.state.loading}>
                            <Segment stacked>
                                <Form.Field>
                                    <label>Store Name</label>
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

                                <Button type="submit" color='teal' fluid size='large'> Create New Store  </Button>
                            </Segment>
                        </Form>

                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default withAuthenticator(withRouter(
    graphql(addNewStore)(AddStore)
))