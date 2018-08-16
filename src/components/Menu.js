import React, { Component } from 'react';
import { Input, Label, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class MenuExampleSizeVerticalLarge extends Component {

  state = { activeItem: 'dashboard' }

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted size='large' vertical>
        <Menu.Item>
          <Input icon='search' placeholder='Search store' />
        </Menu.Item>

        <Link to="/dashboard">
          <Menu.Item name='dashboard' active={activeItem === 'dashboard'}>
            <Label color='teal'>1</Label>
            Dashboard
        </Menu.Item>
        </Link>

        <Menu.Item>
          <Link to="/dashboard/products">
            <Menu.Header> All Products</Menu.Header>
          </Link>
          <Menu.Menu>
            <Link to="/dashboard/products/categories">
              <Menu.Item
                name='Categories'
              />
            </Link>
            <Menu.Item
              name='Add Multiple Products'
            />

          </Menu.Menu>
        </Menu.Item> 

        <Menu.Item name='updates' active={activeItem === 'updates'}>
          <Label>1</Label>
          Stock
        </Menu.Item>

        <Menu.Item name='updates' active={activeItem === 'updates'}>
          <Label>1</Label>
          Orders
        </Menu.Item>

        <Menu.Item name='updates' active={activeItem === 'updates'}>
          <Label>1</Label>
          Sales
        </Menu.Item>

        <Menu.Item name='updates' active={activeItem === 'updates'}>
          <Label>1</Label>
          Expenses
        </Menu.Item>

        <Menu.Item name='updates' active={activeItem === 'updates'}>
          <Label>1</Label>
          Customers
        </Menu.Item>
        <Menu.Item name='updates' active={activeItem === 'updates'}>
          <Label>1</Label>
          Reports
        </Menu.Item>
        <Menu.Item name='updates' active={activeItem === 'updates'}>
          <Label>1</Label>
          Targets
      </Menu.Item>

      </Menu>
    )
  }
}

// import React, { Component } from 'react';
// import { Menu, Icon, Switch }from 'antd';

// const SubMenu = Menu.SubMenu;

// class Sider extends React.Component {
//   state = {
//     theme: 'dark',
//     current: '1',
//   }

//   changeTheme = (value) => {
//     this.setState({
//       theme: value ? 'dark' : 'light',
//     });
//   }

//   handleClick = (e) => {
//     console.log('click ', e);
//     this.setState({
//       current: e.key,
//     });
//   }

//   render() {
//     return (
//       <div>
//         <Switch
//           checked={this.state.theme === 'dark'}
//           onChange={this.changeTheme}
//           checkedChildren="Dark"
//           unCheckedChildren="Light"
//         />
//         <br />
//         <br />
//         <Menu
//           theme={this.state.theme}
//           onClick={this.handleClick}
//           style={{ width: 256 }}
//           defaultOpenKeys={['sub1']}
//           selectedKeys={[this.state.current]}
//           mode="inline"
//         >
//           <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
//             <Menu.Item key="1">Option 1</Menu.Item>
//             <Menu.Item key="2">Option 2</Menu.Item>
//             <Menu.Item key="3">Option 3</Menu.Item>
//             <Menu.Item key="4">Option 4</Menu.Item>
//           </SubMenu>
//           <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigtion Two</span></span>}>
//             <Menu.Item key="5">Option 5</Menu.Item>
//             <Menu.Item key="6">Option 6</Menu.Item>
//             <SubMenu key="sub3" title="Submenu">
//               <Menu.Item key="7">Option 7</Menu.Item>
//               <Menu.Item key="8">Optiadson 8</Menu.Item>
//             </SubMenu>
//           </SubMenu>
//           <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
//             <Menu.Item key="9">Option 9</Menu.Item>
//             <Menu.Item key="10">Option 10</Menu.Item>
//             <Menu.Item key="11">Option 11</Menu.Item>
//             <Menu.Item key="12">Option 12</Menu.Item>
//           </SubMenu>
//         </Menu>
//       </div>
//     );
//   }
// }

// export default Sider;