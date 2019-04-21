import React, { Component } from "react";
import { Forms } from './components/forms.jsx'
import { Tables } from './components/tables.jsx'
import { getMerchantList } from './util/service-helper'
import axios from 'axios'

class Merchants extends Component {
  constructor(props) {  
    super(props);
    
    this.state = {
      merchantsList: [],
      merchant: {
          id: '',
          merchantName: '',
          merchantDescription: ''
        }
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

  handleChangeInfo = e => {
    const {name, value} = e.target;

    this.setState((prevState) => ({
      merchant: {
        ...prevState.merchant,
        [name]: value
      }
    }));
  }

  handleAddMerchant = e => {

    let merchant = this.state.merchant;
    let merchantsList = [...this.state.merchantsList];

    merchantsList.push(merchant);

    this.setState({merchantsList : merchantsList});

    e.preventDefault();
    console.log(merchantsList);

    axios.post('http://localhost:8080/billtracker/rest/merchant/', { merchant })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  deleteMerchant = rowIndex => {

    let merchantsList = [...this.state.merchantsList];

    merchantsList.splice(rowIndex, 1);

    this.setState({merchantsList: merchantsList});

    axios.delete('http://localhost:8080/billtracker/rest/merchant/{this.state.id}')
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {

    console.log('MERCHANTLIST: ');
    console.log(this.state.merchantsList);

    return (
      <div>

      <h1>Merchants</h1>

      <div className='forms-panel'>
        <Forms 
          handleChangeInfo={this.handleChangeInfo} 
          handleAddMerchant={this.handleAddMerchant} 
        />
      </div>
      
      <br/>

      <div className='table-panel'>
        <Tables merchantsList={this.state.merchantsList} deleteMerchant={this.deleteMerchant} />
      </div>
  </div>
);
}
}

export default Merchants;