import React, { Component } from 'react'
import { Menu, Dropdown, Divider, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class MenuExampleSecondaryPointing extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

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
            <Menu.Item
              name='Log Out'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>

      </div>
    )
  }
}