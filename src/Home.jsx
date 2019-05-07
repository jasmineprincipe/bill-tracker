import React, { Component, Fragment } from "react";
import { getCurrentBillList } from './util/service-helper'
import moment from "moment";

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      billsList: [],
      amountDue: ''
    };
  }

  componentDidMount() {
    this.getCurrentBills();
  }

  // GET CURRENT MONTH BILLS FROM DATABASE
  getCurrentBills() {
    getCurrentBillList().then(res => {
      this.setState({ billsList: res.data });
    })
  }

  // COMPUTE TOTAL AMOUNT DUE FOR THE CURRENT MONTH
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
             <p className="amount-due"> {new Intl.NumberFormat('ph-PH', 
                { style: 'currency', currency: 'Php' }).format(this.getAmountDue())}</p>
              <p className="amount-label">{moment().format('MMMM YYYY')}</p> 
          </div>
        <div>
          <Fragment>
            <table className='home-bill-table'>
              <thead>
              </thead>
              <tbody>
                <tr className='bill-table-row'>
                  <th className='table-header'>Merchant</th>
                  <th className='table-header'>Serial Number</th>
                  <th className='table-header'>Bill Date</th>
                  <th className='table-header'>Due Date</th>
                  <th className='table-header'>Amount</th>
                </tr>
                {
                  // DISPLAY CURRENT BILLS TO TABLE
                  this.state.billsList.map((bill) => {
                    return (
                      <tr className='bill-table-row' key={bill.billId}>
                        <th className='table-cell'>{bill.merchantName}</th>     
                        <th className='table-cell'>{bill.serialNumber}</th>
                        <th className='table-cell'>{moment(bill.billDate).format("DD MMM YYYY")}</th>
                        <th className='table-cell'>{moment(bill.dueDate).format("DD MMM YYYY")}</th>
                        <th className='table-cell'>{new Intl.NumberFormat('ph-PH', 
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