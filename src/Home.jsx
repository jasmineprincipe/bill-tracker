import React, { Component, Fragment } from "react";
import { getMerchantList } from './util/service-helper'
import { getBillList } from './util/service-helper'
import axios from 'axios'
 
class Home extends Component {

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
    this.getBills();
    this.getMerchants();
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // SERVICE METHODS
  getBills() {
    getBillList().then(res => {
      this.setState({ billsList: res.data });
    })
  }
  getMerchants() {
    getMerchantList().then(res => {
        this.setState({ merchantsList: res.data });
    })
  }

  // GET BILLS FILTERED BY MERCHANT FROM DATABASE
  getBillsByMerchant(merchantName) {
  axios.get('http://localhost:8080/billtracker/rest/bills/?merchantName=' + merchantName)
    .then(res => {
      this.setState({ billsList: res.data })
      console.log(res);
      console.log(res.data);
    })
  }

  render() {
    return (

      // FILTER BILLS BY MERCHANT
      <div>
      <div className="content-header"><h2>Home</h2>
      <p>The following bills are due this month: </p></div>
      <div className="page-container">
      <Fragment>
        <table className='home-bill-table'>
          <thead>
          </thead>
          <tbody>
            <tr className='bill-table-row'>
              <th className='bill-table-header'>Merchant</th>
              <th className='bill-table-header'>Amount</th>
              <th className='bill-table-header'>Serial Number</th>
              <th className='bill-table-header'>Bill Date</th>
              <th className='bill-table-header'>Due Date</th>
              <th className='bill-table-header'></th>
            </tr>
            {
              // DISPLAY ADDED BILLS TO TABLE
              this.state.billsList.map((bill) => {
                return (
                  <tr className='bill-table-row'>
                    <th className='bill-table-cell'>{bill.merchantName}</th>
                    <th className='bill-table-cell'>{bill.amount}</th>
                    <th className='bill-table-cell'>{bill.serialNumber}</th>
                    <th className='bill-table-cell'>{bill.billDate}</th>
                    <th className='bill-table-cell'>{bill.dueDate}</th>
                    <th className='bill-table-cell'></th>
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
 
export default Home;