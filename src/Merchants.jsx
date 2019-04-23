import React, { Component, Fragment } from "react";
import { getMerchantList } from './util/service-helper'
import axios from 'axios'

class Merchants extends Component {

  constructor(props) {
    super(props);

    this.state = {
      merchantsList: [],
      merchant: {
        merchantName: '',
        merchantDescription: ''
      }
    };
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

  handleChangeInfo = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // ADD MERCHANT TO DB
  handleAddMerchant = e => {

    e.preventDefault();

    let merchant = {
      id: this.state.id,
      merchantName: this.state.merchantName,
      merchantDescription: this.state.merchantDescription
    }

    axios.post('http://localhost:8080/billtracker/rest/merchants/', merchant)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

      this.setState({ state: this.state });
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
        <h2>Merchants</h2>

        <Fragment>
          <form>
            Merchant: <br /><input type="text" name="merchantName" value={this.state.merchantName} onChange={this.handleChangeInfo} /><br />
            Description: <br /><input type="text" name="merchantDescription" value={this.state.merchantDescription} onChange={this.handleChangeInfo} /><br />
            <br />
            <button type="button" onClick={this.handleAddMerchant}>Add</button>
          </form>
        </Fragment>
        <br />
        <Fragment>
          <table className='merchant-table'>
            <thead>

            </thead>
            <tbody>
              <tr className='merchant-table-row'>
                <th className='merchant-table-cell'>Merchant</th>
                <th className='merchant-table-cell'>Description</th>
                <th className='merchant-table-cell'></th>

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
      </div>
    );
  }
}

export default Merchants;