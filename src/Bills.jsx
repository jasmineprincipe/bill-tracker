import React, { Component, Fragment } from "react"
import { getMerchantList } from './util/service-helper'
import { getBillList } from './util/service-helper'
import AddBill from './components/AddBill.jsx'
import axios from 'axios'
import moment from 'moment'
 
class Bills extends Component {

  constructor(props) {
    super(props);

    this.state = {
      billsList: [],
      merchantsList: [],
      showPopup: false,
    };
  }

  // SHOW MODAL FORM
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  componentDidMount() {
    this.getBills();
    this.getMerchants();
  }

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
    this.getBillsByMerchant(e.target.options[e.target.selectedIndex].text); 
  }

  // DELETE BILL FROM DATABASE
  deleteBill(billId) {
    axios.delete('http://localhost:8080/billtracker/rest/bills/' + billId)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.getBills();
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

    // POPULATE DROPDOWN WITH EXISTING DATA FROM MERCHANTS LIST
    let merchantOptions = this.state.merchantsList.map((merchant) =>
            <option key={merchant.merchantName}>{merchant.merchantName}</option>
    );
    return (

      // FILTER BILLS BY MERCHANT
      <div>
        <div className="bill-filter">
            <select  name="merchantName" value={this.merchantName} onChange={this.handleChangeInfo}> 
                <option value=''>-- Select merchant</option>
                {merchantOptions}
            </select> <br></br>
        </div>
      <div className="content-header"><h2>Bills</h2></div>
      <div>
      <button className="add-bill-btn" onClick={this.togglePopup.bind(this)}>+</button>
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
              <th className='table-header'>Merchant</th>
              <th className='table-header'>Amount</th>
              <th className='table-header'>Serial Number</th>
              <th className='table-header'>Bill Date</th>
              <th className='table-header'>Due Date</th>
              <th className='table-header'></th>
            </tr>
            {
              // DISPLAY ADDED BILLS TO TABLE
              this.state.billsList.map((bill) =>
                 {
                return (
                  <tr className='bill-table-row' key={bill.billId}>
                    <th className='table-cell'>{bill.merchantName}</th>
                    <th className='table-cell'>{new Intl.NumberFormat('ph-PH', { 
                          style: 'currency', currency: 'Php' }).format(bill.amount)}</th>
                    <th className='table-cell'>{bill.serialNumber}</th>
                    <th className='table-cell'>{moment(bill.billDate).format("DD MMM YYYY")}</th>
                    <th className='table-cell'>{moment(bill.dueDate).format("DD MMM YYYY")}</th>
                    <th className='table-cell'>
                    <link rel="stylesheet" 
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <button className="delete-btn">
                       <i className="fa fa-remove" onClick={() => this.deleteBill(bill.billId)}></i>
                    </button></th>
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