import React, { Component } from 'react'
import { Menu, Dropdown, Divider, Icon, Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import Auth from '@aws-amplify/auth';
import getUserStores from '../queries/getUserStores';

class TopBar extends Component {
  state = {
    activeItem: 'home',
    loading: false
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  onLogOut = () => {
    this.setState({ loading: true })
    return Auth.signOut()
      .then(data => {
        console.log(data)
        this.setState({ loading: false })
        this.props.client.resetStore()
        this.props.history.push('/dashboard')
      })
      .catch(err => console.log(err))
  }

  onResync = async () => {
    this.setState({ loading: true })
    const { client } = this.props
    const query = getUserStores
    await client.query({
      query,
      fetchPolicy: 'network-only'
    })
    this.setState({ loading: false })
  }

  render() {
    const { activeItem } = this.state
    console.log(this.props)
    return (
      <div>
        <Menu pointing secondary>

          <Divider horizontal />

          <Menu.Item>
            NaneTisa
          </Menu.Item>

          <Link to="/dashboard">
            <Menu.Item>
              Store 1 Dashboard
          </Menu.Item>
          </Link>

          <Dropdown item text='Switch Store'>
            <Dropdown.Menu>
              <Link to="/store/">
                <Dropdown.Item> Switch Store</Dropdown.Item>
              </Link>

              <Divider />
              <Link to="/store/new">
                <Dropdown.Item>Add New Store <Icon name="add" /> </Dropdown.Item>
              </Link>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Menu position='right'>

            <Button
              icon="sync alternate"
              circular
              onClick={this.onResync}
              loading={this.state.loading}
              basic
            />


            <Button
              content='Log Out'
              onClick={this.onLogOut}
              loading={this.state.loading}
              basic
            />
          </Menu.Menu>
        </Menu>

      </div>
    )
  }
}

export default withApollo(withRouter(TopBar))