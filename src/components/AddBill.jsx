import React, { Component } from 'react';
import { getMerchantList } from '../util/service-helper'
import '../css/bill_form.css';
import axios from 'axios'

class AddBill extends Component {
    constructor(props) {
        super(props);

        this.state = {
            billsList: [],
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
    handleChangeInfo = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    getMerchants() {
        getMerchantList().then(res => {
            this.setState({ merchantsList: res.data });
        })
    }

    // ADD BILL TO DB
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

        axios.post('http://localhost:8080/billtracker/rest/bills/', bill)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        window.location.reload();
    }
    render() {
        let merchantOptions = this.state.merchantsList.map((merchant) =>
            <option key={merchant.merchantName}>{merchant.merchantName}</option>
        );
        return (
            <div className='billform-container'>
                <div className='billform_inner'>
                    <button className="close-form-button" onClick={this.props.closePopup}>X</button>
                    <h2>Add Bill</h2>
                    <form className='billform'>
                        <label>Merchant</label>
                            <br /> <select name="merchantName" value={this.merchantName} onChange={this.handleChangeInfo}> {merchantOptions} </select> <br></br>
                        <label>Amount</label>
                            <br /><input type="text" name="amount" value={this.amount} onChange={this.handleChangeInfo} /><br />
                        <label>Serial Number</label>
                            <br /><input type="text" name="serialNumber" value={this.serialNumber} onChange={this.handleChangeInfo} /><br />
                        <label>Bill Date</label><br />
                            <input type="text" name="billDate" value={this.billDate} onChange={this.handleChangeInfo} /><br />
                        <label>Due Date</label><br />
                             <input type="text" name="dueDate" value={this.dueDate} onChange={this.handleChangeInfo} /><br />
                        <button type="button" className="billform-submit-button" onClick={this.handleAddBill}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default AddBill;