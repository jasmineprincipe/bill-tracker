import React, { Component } from 'react';
import './css/header.css';
import './css/body.css';
import './css/tables.css';
import './css/App.css';
import Header from './components/header.jsx';
import Body from './components/body.jsx';
import {
  getMerchantList
} from './util/service-helper';

class App extends Component {
  
  constructor(props) {  
    super(props);
    
    this.state = {
        merchantsList: [],
        date: new Date()
    };
  }

  // LIFE CYCLE METHODS
  componentDidMount() {
    this.getMerchants(); 
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // SERVICE METHODS
  getMerchants() {
    getMerchantList().then(res => {
      this.setState({merchantsList : res.data});
    }) 
  }

  // ETC METHODS
  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {

    console.log('MERCHANTLIST: ');
    console.log(this.state.merchantsList);

    return (
      <div className='my-app'>
        
        {/* <Header date={this.state.date.toLocaleTimeString()}></Header> */}
        
        <Header/>
        <Body merchantsList={this.state.merchantsList}/>
      </div>
    );
  }
}

export default App;
