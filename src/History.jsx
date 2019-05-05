import React, { Component, Fragment } from "react";
import { getHistory } from './util/service-helper'
import moment from 'moment'

class History extends Component {

  constructor(props) {
    super(props);

    this.state = {
      billHistory: [],
      showPopup: false
    };
  }

  componentDidMount() {
    this.getBillHistory();
  }

  getBillHistory() {
    getHistory().then(res => {
      this.setState({ billHistory: res.data });
    })
  }

  render() {
    return (
      <div>
        <div className="content-header"><h2>History</h2></div>
        <div className="page-container">
        <Fragment>
          <table className='history-table'>
            <thead>
            </thead>
            <tbody>
              <tr className='merchant-table-row'>
                <th className='merchant-table-header'>Year</th>
                <th className='merchant-table-header'>Month</th>
                <th className='merchant-table-header'>Total Amount</th>
              </tr>
              {
                this.state.billHistory.map((h) => {
                  return (
                    <tr className='merchant-table-row'>
                      <th className='text-cell'>{h.yearDue}</th>
                      <th className='text-cell'>{moment.months(h.monthDue - 1)}</th>
                      <th className='amount-cell'>{new Intl.NumberFormat('ph-PH', { 
                          style: 'currency', currency: 'Php' }).format(h.totalAmount)}</th>
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