import React, { Component, Fragment } from "react";
import { getBillList } from './util/service-helper'
// import { getMerchantList } from './util/service-helper';
import AddBill from './components/AddBill.jsx';
import axios from 'axios'
 
class Bills extends Component {

  constructor(props) {
    super(props);

    this.state = {
      billsList: [],
      merchantsList: [],
      showPopup: false
      // bill: {
      //   merchantName: '',
      //   amount: '',
      //   serialNumber: '',
      //   billDate: '',
      //   dueDate: ''
      // }
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
    // this.getMerchants();
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

  // getMerchants() {
  //   getMerchantList().then(res => {
  //     this.setState({ merchantsList: res.data });
  //   })
  // }

  // handleChangeInfo = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // }

  // // ADD BILL TO DB
  // handleAddBill = e => {

  //   e.preventDefault();

  //   let bill = {
  //     billId: this.state.billId,
  //     merchantName: this.state.merchantName,
  //     amount: this.state.amount,
  //     serialNumber: this.state.serialNumber,
  //     billDate: this.state.billDate,
  //     dueDate: this.state.dueDate
  //   }

  //   axios.post('http://localhost:8080/billtracker/rest/bills/', bill)
  //     .then(res => {
  //       console.log(res);
  //       console.log(res.data);
  //     })
  // }

  deleteMerchant = rowIndex => {

    let billsList = [...this.state.billsList];
    billsList.splice(rowIndex, 1);
    this.setState({ billsList: billsList });

    axios.delete('http://localhost:8080/billtracker/rest/bills/' + this.props.id) //mali pa to
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    // let merchantOptions = this.state.merchantsList.map((merchant) =>
    //             <option key={merchant.merchantName}>{merchant.merchantName}</option>
    //         );
    return (
      <div>
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
              this.state.billsList.map((bill, index) => {
                return (
                  <tr className='bill-table-row'>
                    <th className='bill-table-cell'>{bill.merchantName}</th>
                    <th className='bill-table-cell'>{bill.amount}</th>
                    <th className='bill-table-cell'>{bill.serialNumber}</th>
                    <th className='bill-table-cell'>{bill.billDate}</th>
                    <th className='bill-table-cell'>{bill.dueDate}</th>
                    <th className='bill-table-cell'><button type='button' onClick={() => this.deleteBill(index)}>Delete</button></th>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </Fragment>
      <br />
      {/* <Fragment>
        <form>
          Merchant:<br /> <select name="merchantName" value={this.state.merchantName} onChange={this.handleChangeInfo}> {merchantOptions} </select> <br></br>
          Amount: <br /><input type="text" name="amount" value={this.state.amount} onChange={this.handleChangeInfo} /><br />
          Serial Number: <br /><input type="text" name="serialNumber" value={this.state.serialNumber} onChange={this.handleChangeInfo} /><br />
          Bill Date: <br /><input type="text" name="billDate" value={this.state.billDate} onChange={this.handleChangeInfo} /><br />
          Due Date: <br /><input type="text" name="dueDate" value={this.state.dueDate} onChange={this.handleChangeInfo} /><br />
          <br />
          <button type="button" onClick={this.handleAddBill}>Add</button>
        </form>
      </Fragment> */}
      </div>
    </div>
    );
  }
}
 
export default Bills;