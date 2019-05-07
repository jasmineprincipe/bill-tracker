import React, { Component, Fragment } from "react";
import { getMerchantList } from './util/service-helper'
import AddMerchant from './components/AddMerchant.jsx';
import axios from 'axios';

class Merchants extends Component {

  constructor(props) {
    super(props);

    this.state = {
      merchantsList: [],
      showPopup: false
    };
  }

  // SHOW MODAL FORM
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  componentDidMount() {
    this.getMerchants();
  }

  getMerchants() {
    getMerchantList().then(res => {
      this.setState({ merchantsList: res.data });
    })
  }

  // DELETE MERCHANT FROM DATABASE
  deleteMerchant(merchantId) {
    axios.delete('http://localhost:8080/billtracker/rest/merchants/' + merchantId)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.getMerchants();
      })
  }

  render() {
    return (
      <div>
        <div className="content-header"></div>
        <h2>Merchants</h2>
        <div>
          <button className="add-merchant-btn" onClick={this.togglePopup.bind(this)}>+</button>
          {this.state.showPopup ?
            <AddMerchant
              text='Close Me'
              closePopup={this.togglePopup.bind(this)}
            />
            : null}
          <Fragment>
            <table className='merchant-table'>
              <thead>
              </thead>
              <tbody>
                <tr className='merchant-table-row'>
                  <th className='table-header'>Merchant</th>
                  <th className='table-header'>Description</th>
                  <th className='table-header'></th>
                </tr>
                {
                  // DISPLAY ADDED MERCHANTS TO TABLE
                  this.state.merchantsList.map((merchant) => {
                    return (
                      <tr className='merchant-table-row' key={merchant.merchantId}>
                        <th className='table-cell'>{merchant.merchantName}</th>
                        <th className='table-cell'>{merchant.merchantDescription}</th>
                        <th className='table-cell'>
                          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                          <button className="delete-btn">
                            <i className="fa fa-remove" onClick={() => this.deleteMerchant(merchant.merchantId)}></i>
                          </button>
                        </th>
                      </tr>)
                  })
                }
              </tbody>
            </table>
          </Fragment>
          <br />
        </div>
      </div>
    );
  }
}

export default Merchants;