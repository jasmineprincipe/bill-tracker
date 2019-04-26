import React, { Component, Fragment } from "react";
import { getMerchantList } from './util/service-helper'
import { getBillList } from './util/service-helper'
import AddBill from './components/AddBill.jsx';
import axios from 'axios'
 
class Bills extends Component {

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

  handleChangeInfo = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  deleteBill(billId) {
    axios.delete('http://localhost:8080/billtracker/rest/bills/' + billId)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.getBills();
      }) 
  }

  render() {
    let merchantOptions = this.state.merchantsList.map((merchant) =>
            <option key={merchant.merchantName}>{merchant.merchantName}</option>
    );
    return (
      <div>
        <div className="filter-container">
          <label className="filter-label">Filter by Merchant</label><br />
            <select  name="merchantName" value={this.merchantName} onChange={this.handleChangeInfo}> 
                {merchantOptions}
            </select> <br></br>
        </div>

      <div className="content-header"><h2>Bills</h2></div>
      <div className="page-container">
      <button className="add-merchant-button" onClick={this.togglePopup.bind(this)}>Add Bill</button>
        {this.state.showPopup ? 
          <AddBill
            text='Close Me'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }

      <Fragment>
        <table className='bill-table'>
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
              this.state.billsList.map((bill) => {
                return (
                  <tr className='bill-table-row'>
                    <th className='bill-table-cell'>{bill.merchantName}</th>
                    <th className='bill-table-cell'>{bill.amount}</th>
                    <th className='bill-table-cell'>{bill.serialNumber}</th>
                    <th className='bill-table-cell'>{bill.billDate}</th>
                    <th className='bill-table-cell'>{bill.dueDate}</th>
                    <th className='bill-table-cell'>
                    <button type='button' className='edit-button'>Edit</button>
                    <button type='button' className="delete-button" 
                    onClick={() => this.deleteBill(bill.billId)}>Delete</button></th>
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
 
export default Bills;