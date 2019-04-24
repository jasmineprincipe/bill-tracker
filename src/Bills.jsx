import { getBillList } from './util/service-helper'
import React, { Component, Fragment } from "react";
 
class Bills extends Component {

  constructor(props) {
    super(props);

    this.state = {
      billsList: [],
    };
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
  render() {
    return (
      <div>
      <div className="content-header"><h2>Bills</h2></div>
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
      <Fragment>
        <form>
          Merchant: <br /><input type="text" name="merchantName" value={this.state.merchantName} onChange={this.handleChangeInfo} /><br />
          Amount: <br /><input type="text" name="amount" value={this.state.amount} onChange={this.handleChangeInfo} /><br />
          Serial Number: <br /><input type="text" name="serialNumber" value={this.state.serialNumber} onChange={this.handleChangeInfo} /><br />
          Bill Date: <br /><input type="text" name="billDate" value={this.state.billDate} onChange={this.handleChangeInfo} /><br />
          Due Date: <br /><input type="text" name="dueDate" value={this.state.dueDate} onChange={this.handleChangeInfo} /><br />
          <br />
          <button type="button" onClick={this.handleAddBill}>Add</button>
        </form>
      </Fragment>
      </div>
    </div>
    );
  }
}
 
export default Bills;