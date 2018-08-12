import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from './components/Menu';
import TopBar from './components/TopBar';

//pages
import Home from './components/Home';
import Products from './components/Products';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <TopBar />
          <div className="container main">
            <Menu />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/products" component={Products} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
