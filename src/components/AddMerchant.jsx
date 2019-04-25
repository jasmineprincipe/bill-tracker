import React, { Component } from 'react';
import '../css/popup.css';
import axios from 'axios'

class Popup extends Component {
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

  handleChangeInfo = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // ADD MERCHANT TO DB
  handleAddMerchant = e => {

    e.preventDefault();

    let merchant = {
      id: this.state.id,
      merchantName: this.state.merchantName,
      merchantDescription: this.state.merchantDescription
    }

    axios.post('http://localhost:8080/billtracker/rest/merchants/', merchant)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

    this.setState({ state: this.state });
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <button className="close-form-button" onClick={this.props.closePopup}>X</button>
          <h2>Add Merchant</h2>
          <form>
            <br /><input type="text" name="merchantName" placeholder="Merchant" value={this.merchantName} onChange={this.handleChangeInfo} />
            <br /><input type="text" name="merchantDescription" placeholder="Description" value={this.merchantDescription} onChange={this.handleChangeInfo} /><br />
            <button type="button" className="form-submit-button" onClick={this.handleAddMerchant}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Popup;