import React, { Component, Fragment } from "react";
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
       startDate: new Date()
    };
     this.handleChange = this.handleChange.bind(this);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  // LIFE CYCLE METHODS
  componentDidMount() {
    this.getBills();
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

  // handleChangeInfo = e => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // }

  handleChange(date) {
    this.setState({
      startDate: date
    });
    // this.getBillsByMonth()
  }

  // GET BILLS FILTERED BY MONTH AND YEAR FROM DATABASE
  getBillsByMonth = e => {

    e.preventDefault();
    
    let billMonth = this.state.startDate.getMonth() + 1;
    let billYear = this.state.startDate.getFullYear();
    
    axios.get('http://localhost:8080/billtracker/rest/bills/?billMonth=' + billMonth + '&billYear=' + billYear)
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
          {/* <input name="billMonth" value={this.state.billMonth} onChange={this.handleChangeInfo}/> 
          <input name="billYear" value={this.state.billYear} onChange={this.handleChangeInfo} /> 
          <button className="btn btn-success" 
            onClick={this.getBillsByMonth}>View Bills </button>      */}
          <form onSubmit={this.getBillsByMonth}>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                name="startDate"
                dateFormat="MMMM YYYY"
                showMonthYearPicker
              />
              <button className="btn btn-success">View Bills</button>
              {/* <DatePicker
              value={this.history}
              selected={this.state.startDate}
              onChange={this.handleChange}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
            /> */}
            </form>
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
                              style: 'currency', currency: 'Php'
                            }).format(bill.amount)}</th>
                            <th className='text-cell'>{bill.serialNumber}</th>
                            <th className='date-cell'>{moment(bill.billDate).format("DD MMM YYYY")}</th>
                            <th className='date-cell'>{moment(bill.dueDate).format("DD MMM YYYY")}</th>
                            <th className='text-cell'>
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