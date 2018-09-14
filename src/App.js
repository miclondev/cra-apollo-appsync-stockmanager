import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from './components/Menu';
import TopBar from './components/TopBar';

//main pages
import Home from './components/Home';

import Settings from './components/Settings';
import Customers from './components/Customers';
import Stock from './components/Stock';
import Targets from './components/Targets';
import SaleOrders from './components/SaleOrders';
import Sales from './components/Sales';

import AddStore from './components/admin/AddStore';
import Main from './components/admin/Main';
import SwitchStore from './components/admin/SwitchStore';
import DashBoardProductRoutes from './routes/DashBoardProductRoutes';

const dashboardRoutes = ({ match }) => {
  return (
    <div className="container main">
      <Menu />
      <Route path={`${match.url}`} component={Home} exact />
      <Route path={`${match.url}/products`} component={DashBoardProductRoutes} />
      <Route path={`${match.url}/stock`} component={Stock} />
      <Route path={`${match.url}/sales`} component={Sales} />
      <Route path={`${match.url}/targets`} component={Targets} />
      <Route path={`${match.url}/customers`} component={Customers} />
      <Route path={`${match.url}/settings`} component={Settings} />
      <Route path={`${match.url}/sale-orders`} component={SaleOrders} />
    </div>
  )
}

const storeRoutes = ({ match }) => {
  return (
    <div className="container">
      <Route path={`${match.url}`} component={SwitchStore} exact />
      <Route path={`${match.url}/new`} component={AddStore} exact />
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <TopBar />
          <Switch>
            <Route path="/" component={Main} exact />
            <Route path="/dashboard" component={dashboardRoutes} />
            <Route path="/store" component={storeRoutes} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}


export default App;