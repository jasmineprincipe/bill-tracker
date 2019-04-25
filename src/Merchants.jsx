import React, { Component, Fragment } from "react";
import { getMerchantList } from './util/service-helper'
import AddMerchant from './components/AddMerchant.jsx';
import axios from 'axios';

class Merchants extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
    this.getMerchants();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // SERVICE METHODS
  getMerchants() {
    getMerchantList().then(res => {
      this.setState({ merchantsList: res.data });
    })
  }

  deleteMerchant = rowIndex => {

    let merchantsList = [...this.state.merchantsList];
    merchantsList.splice(rowIndex, 1);
    this.setState({ merchantsList: merchantsList });

    axios.delete('http://localhost:8080/billtracker/rest/merchants/' + this.props.id) //mali pa to
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {

    return (
      <div>
        <div className="content-header"></div>
          <h2>Merchants</h2>
        <div className="page-container">

        <button className="add-merchant-button" onClick={this.togglePopup.bind(this)}>Add Merchant</button>
        {/* <button onClick={() => {alert('woooooooot?');}}>try me when popup is open</button> */}
        {this.state.showPopup ? 
          <AddMerchant
            text='Close Me'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
        <Fragment>
          <table className='merchant-table'>
            <thead>

            </thead>
            <tbody>
              <tr className='merchant-table-row'>
                <th className='merchant-table-header'>Merchant</th>
                <th className='merchant-table-header'>Description</th>
                <th className='merchant-table-header'></th>
              </tr>
              {
                this.state.merchantsList.map((merchant, index) => {
                  return (
                    <tr className='merchant-table-row'>
                      <th className='merchant-table-cell'>{merchant.merchantName}</th>
                      <th className='merchant-table-cell'>{merchant.merchantDescription}</th>
                      <th className='merchant-table-cell'><button type='button' onClick={() => this.deleteMerchant(index)}>Delete</button></th>
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

export default Merchants;