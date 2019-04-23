import React, { Component, Fragment } from "react";
import { Tables } from './components/tables.jsx'
import { getMerchantList } from './util/service-helper'
import axios from 'axios'

class Merchants extends Component {

  constructor(props) {
    super(props);

    this.state = {
      merchantsList: [],
      merchant: {
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
      this.setState({ merchantsList: res.data });
    })
  }

  handleChangeInfo = e => {

    this.setState({ [e.target.name]: e.target.value });
  }

  // ADD MERCHANT TO DB
  handleAddMerchant = e => {

    let merchant = this.state.merchant;
    let merchantsList = [...this.state.merchantsList];
    merchantsList.push(merchant);

    this.setState({ merchantsList: merchantsList });

    e.preventDefault();

    merchant = {
      id: this.state.id,
      merchantName: this.state.merchantName,
      merchantDescription: this.state.merchantDescription
    }

    axios.post('http://localhost:8080/billtracker/rest/merchants/', merchant)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  deleteMerchant = rowIndex => {

    let merchantsList = [...this.state.merchantsList];
    let merchant = this.state.merchant;

    merchantsList.splice(rowIndex, 1);

    this.setState({ merchantsList: merchantsList });

    axios.delete('http://localhost:8080/billtracker/rest/merchants/' + merchant.id) //mali pa to
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

        <h2>Merchants</h2>

        <Fragment>
          <form>
            Merchant: <br/><input 
                              type="text" 
                              name="merchantName" 
                              value={this.state.merchantName} 
                              onChange={this.handleChangeInfo} /><br />
            Description: <br/><input 
                                type="text" 
                                name="merchantDescription" 
                                value={this.state.merchantDescription} 
                                onChange={this.handleChangeInfo} /><br />
            <br />
            <button type="button" onClick={this.handleAddMerchant}>Add</button>
          </form>
        </Fragment>
        <br />

        <div className='table-panel'>
          <Tables merchantsList={this.state.merchantsList} deleteMerchant={this.deleteMerchant} />
        </div>
      </div>
    );
  }
}

export default Merchants;