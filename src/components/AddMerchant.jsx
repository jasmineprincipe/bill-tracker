import React, { Component } from 'react';
import { getMerchantList } from '../util/service-helper'
import axios from 'axios'

class AddMerchant extends Component {
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

  getMerchants() {
    getMerchantList().then(res => {
        this.setState({ merchantsList: res.data });
    })
  }
  
  handleChangeInfo = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAddMerchant = e => {

    e.preventDefault();

    let merchant = {
      merchantId: this.state.merchantId,
      merchantName: this.state.merchantName,
      merchantDescription: this.state.merchantDescription
    }
    // ADD NEW MERCHANT TO DATABASE
    axios.post('http://localhost:8080/billtracker/rest/merchants/', merchant)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      window.location.reload();
  }

  render() {
    return (
      // DISPLAY MERCHANT FORM
      <div className='popup'>
        <div className='popup_inner'>
          <button className="close-form-button" onClick={this.props.closePopup}>X</button>
          <h2>Add Merchant</h2>
          <form>
            <label className="form-label">Merchant</label>
            <br /><input type="text" name="merchantName" maxlength="20" pattern="[A-Za-z]" value={this.merchantName} onChange={this.handleChangeInfo} />
            <label className="form-label">Description</label>
            <br /><input type="text" name="merchantDescription" maxlength="20" value={this.merchantDescription} onChange={this.handleChangeInfo} /><br />
            <button type="button" className="form-submit-button" onClick={this.handleAddMerchant}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddMerchant;