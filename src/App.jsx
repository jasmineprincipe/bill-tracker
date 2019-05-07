import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Home from "./Home";
import Bills from "./Bills";
import Merchants from "./Merchants";
import History from "./History";
import './css/header.css';
import './css/body.css';
import './css/tables.css';
import './css/forms.css';
import './css/buttons.css';

class App extends Component {
  render() {
    return (
        <div>
          <div className="header-div">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossOrigin="anonymous"></link>
            <i className="fas fa-chart-line"></i> BILL<label className="headerlabel">TRACKER</label>
          </div>
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
