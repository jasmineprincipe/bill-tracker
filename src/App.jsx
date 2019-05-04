import React, { Component } from 'react';
import './css/header.css';
import './css/body.css';
import './css/tables.css';
import './css/merchant_form.css';
import './css/bill_form.css';
import './css/App.css';
import "react-datepicker/dist/react-datepicker.css";
import Header from './components/header.jsx';
import { Route, NavLink, HashRouter } from "react-router-dom";
import Home from "./Home";
import Bills from "./Bills";
import Merchants from "./Merchants";
import History from "./History";

class App extends Component {
  render() {
    return (
        <div>
          <Header />
          <div className="my-app-body">
          <HashRouter>
            <div className="sidenav">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/bills">Bills</NavLink>
              <NavLink to="/merchants">Merchants</NavLink>
              <NavLink to="/history">History</NavLink>
            </div>
            <div className="content">
              <Route exact path="/" component={Home}/>
              <Route path="/bills" component={Bills}/>
              <Route path="/merchants" component={Merchants}/>
              <Route path="/history" component={History}/>
            </div>  
          </HashRouter>
          </div>
        </div>
    );
  }
}

export default App;
