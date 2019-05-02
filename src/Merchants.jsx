import React, { Component, Fragment } from "react";
import { getMerchantList } from './util/service-helper'
import { getBillList } from './util/service-helper'
import AddMerchant from './components/AddMerchant.jsx';
import axios from 'axios';

class Merchants extends Component {

  constructor(props) {
    super(props);

    this.state = {
      billsList: [],
      merchantsList: [],
      showPopup: false
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
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
  getBills() {
    getBillList().then(res => {
      this.setState({ billsList: res.data });
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
        <div className="page-container">
        <button className="add-merchant-button" onClick={this.togglePopup.bind(this)}>Add Merchant</button>
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
                <th className='merchant-table-header'>Merchant</th>
                <th className='merchant-table-header'>Description</th>
                <th className='merchant-table-header'></th>
              </tr>
              {
                // DISPLAY ADDED MERCHANTS TO TABLE
                this.state.merchantsList.map((merchant) => {
                  return (
                    <tr className='merchant-table-row'>
                      <th className='text-cell'>{merchant.merchantName}</th>
                      <th className='text-cell'>{merchant.merchantDescription}</th>
                      <th className='text-cell'>
                      <button type='button' className='delete-button'
                        onClick={() => this.deleteMerchant(merchant.merchantId)}>Delete</button>
                      </th>
                    </tr>
                  )
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