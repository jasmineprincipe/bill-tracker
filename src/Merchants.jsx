import React, { Component } from "react";
import MerchantsBody from './components/merchantsbody.jsx'
import {
    getMerchantList
  } from './util/service-helper';
 
class Merchants extends Component {

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

    /*     console.log('MERCHANTLIST: ');
    console.log(this.state.merchantsList); */

    return (
      <div>
        <h2>Merchants</h2>
        
        <MerchantsBody merchantsList={this.state.merchantsList}/>

      </div>
    );
  }
}
 
export default Merchants;