import React, { Component } from 'react';
import { getMerchantList } from '../util/service-helper'
import axios from 'axios'

class AddBill extends Component {
    constructor(props) {
        super(props);

        this.state = {
            merchantsList: [],
            bill: {
                merchantName: '',
                amount: '',
                serialNumber: '',
                billDate: '',
                dueDate: ''
            }
        };
    };

    componentDidMount() {
        this.getMerchants();
    }

    getMerchants() {
        getMerchantList().then(res => {
            this.setState({ merchantsList: res.data });
        })
    }

    handleChangeInfo = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleAddBill = e => {

        e.preventDefault();

        let bill = {
            billId: this.state.billId,
            merchantName: this.state.merchantName,
            amount: this.state.amount,
            serialNumber: this.state.serialNumber,
            billDate: this.state.billDate,
            dueDate: this.state.dueDate
        }

        // ADD NEW BILL TO DATABASE
        axios.post('http://localhost:8080/billtracker/rest/bills/', bill)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        window.location.reload();
    }
    render() {
        // POPULATE DROPDOWN WITH EXISTING DATA FROM MERCHANTS LIST
        let merchantOptions = this.state.merchantsList.map((merchant) =>
            <option key={merchant.merchantName}>{merchant.merchantName}</option>
        );
        return (
            // DISPLAY BILL FORM
            <div className='billform-container'>
                <div className='billform_inner'>
                    <button className="close-form-button" onClick={this.props.closePopup}>X</button>
                    <h2>Add Bill</h2>
                    <form className='billform'>
                        <label className="bill-form-label">Merchant</label><br />
                        <select name="merchantName" value={this.merchantName} onChange={this.handleChangeInfo}>
                            <option value="">-- Select a merchant </option>
                            {merchantOptions}
                        </select> <br></br>
                        <label className="bill-form-label">Amount</label><br />
                        <input
                            type="number"
                            min="0"
                            step=".01"
                            max="999999"
                            name="amount"
                            value={this.amount}
                            onChange={this.handleChangeInfo} /><br />
                        <label className="bill-form-label">Serial Number</label><br />
                        <input
                            type="text"
                            name="serialNumber"
                            maxLength="12"
                            value={this.serialNumber}
                            onChange={this.handleChangeInfo} /><br />
                        <label className="bill-form-label">Bill Date</label><br />
                        <input
                            type="date"
                            name="billDate"
                            value={this.billDate}
                            onChange={this.handleChangeInfo} /><br />
                        <label className="bill-form-label">Due Date</label><br />
                        <input
                            type="date"
                            name="dueDate"
                            value={this.dueDate}
                            onChange={this.handleChangeInfo} /><br />
                        <button type="button" className="billform-submit-button" onClick={this.handleAddBill}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default AddBill;