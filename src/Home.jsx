import React, { Component, Fragment } from "react";
import { getCurrentBillList } from './util/service-helper'
 
class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      billsList: [],
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

  render() {
    return (
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