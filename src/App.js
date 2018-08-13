import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from './components/Menu';
import TopBar from './components/TopBar';

//pages
import Home from './components/Home';
import Products from './components/Products';
import AddStore from './components/admin/AddStore';
import Main from './components/admin/Main';
import SwitchStore from './components/admin/SwitchStore'

const dashboardRoutes = ({ match }) => {
  return (
    <div className="container main">
      <Menu />
      <Route path={`${match.url}`} component={Home} exact />
      <Route path={`${match.url}/products`} component={Products} />
    </div>
  )
}

const storeRoutes = ({ match }) => {
  return (
    <div className="container">
      <Route path={`${match.url}`} component={SwitchStore} />
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