import React, { Component, Fragment } from "react";
import { getCurrentBillList } from './util/service-helper'
import moment from "moment";

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      billsList: [],
      showPopup: false,
      amountDue: ''
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  // LIFE CYCLE METHODS
  componentDidMount() {
    this.getCurrentBills();
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // SERVICE METHODS
  getCurrentBills() {
    getCurrentBillList().then(res => {
      this.setState({ billsList: res.data });
    })
  }

  // COMPUTE TOTAL AMOUNT DUE FOR THE MONTH
  getAmountDue(){
    let amountDue = 0;
    for (let i = 0; i < this.state.billsList.length; i++) {
      amountDue += this.state.billsList[i].amount;
    }
    return amountDue;
  }

  render() {    
    return (
      <div>
        <div className="content-header"><h2>Home</h2>
          <p>The following bills are due this month: </p>
        </div>
        <div className="amount-container">
             <p className="amount-label">Total amount due</p>
             <p className="amount-due"> {new Intl.NumberFormat('ph-PH', 
                { style: 'currency', currency: 'Php' }).format(this.getAmountDue())}</p>
          </div>
        <div className="page-container">
          <Fragment>
            <table className='home-bill-table'>
              <thead>
              </thead>
              <tbody>
                <tr className='bill-table-row'>
                  <th className='bill-table-header'>Merchant</th>
                  <th className='bill-table-header'>Serial Number</th>
                  <th className='bill-table-header'>Bill Date</th>
                  <th className='bill-table-header'>Due Date</th>
                  <th className='bill-table-header'>Amount</th>
                </tr>
                {
                  // DISPLAY ADDED BILLS TO TABLE
                  this.state.billsList.map((bill) => {
                    return (
                      <tr className='bill-table-row'>
                        <th className='bill-table-cell'>{bill.merchantName}</th>     
                        <th className='bill-table-cell'>{bill.serialNumber}</th>
                        <th className='bill-table-cell'>{moment(bill.billDate).format("D MMM YYYY")}</th>
                        <th className='bill-table-cell'>{moment(bill.dueDate).format("D MMM YYYY")}</th>
                        <th className='bill-table-cell'>{new Intl.NumberFormat('ph-PH', 
                         { style: 'currency', currency: 'Php' }).format(bill.amount)}</th>
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