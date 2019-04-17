import React, { Component } from 'react';
import './css/header.css';
import './css/body.css';
import './css/tables.css';
import './css/App.css';
import Header from './components/header.jsx';
import Body from './components/body.jsx';
//import axios from "axios";

class App extends Component {

  render() {
    return (
      <div className="my-app">
        <Header />
        <Body />
      </div>
    );
  }
}

export default App;
