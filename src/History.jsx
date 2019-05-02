import React, { Component, Fragment } from "react";
import { getMerchantList } from './util/service-helper'
import { getBillList } from './util/service-helper'
import DatePicker from "react-datepicker";
import axios from 'axios'
import moment from 'moment'
 
class History extends Component {

  constructor(props) {
    super(props);

    this.state = {
      billsList: [],
      merchantsList: [],
      showPopup: false,
      monthList: []
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

    //GET DATA FROM SELECTED DROPDOWN OPTION
    this.getBillsByMonth(e.target.options[e.target.selectedIndex].text); 
  }

  // GET BILLS FILTERED BY MONTH FROM DATABASE
  getBillsByMonth(dueDate) {
  axios.get('http://localhost:8080/billtracker/rest/bills/?dueDate=' + dueDate)
    .then(res => {
      this.setState({ billsList: res.data })
      console.log(res);
      console.log(res.data);
    })
  }

  render() {

    return (
      <div>
        <div className="bill-filter-container">
          <label className="bill-filter-label">Filter by Month </label>
            <DatePicker
              value={this.dueDate}
              selected={this.state.startDate}
              onChange={this.handleChange}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
        </div>
      <div className="content-header"><h2>History</h2></div>
      <div className="page-container">
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
              // DISPLAY ADDED BILLS TO TABLE
              this.state.billsList.map((bill) => {
                return (
                  <tr className='bill-table-row'>
                    <th className='text-cell'>{bill.merchantName}</th>
                    <th className='amount-cell'>{new Intl.NumberFormat('ph-PH', { 
                          style: 'currency', currency: 'Php' }).format(bill.amount)}</th>
                    <th className='text-cell'>{bill.serialNumber}</th>
                    <th className='date-cell'>{moment(bill.billDate).format("DD MMM YYYY")}</th>
                    <th className='date-cell'>{moment(bill.dueDate).format("DD MMM YYYY")}</th>
                    <th className='text-cell'>
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
 
export default History;