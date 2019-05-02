import React, { Component } from 'react';
import '../css/merchant_form.css';
import { getMerchantList } from '../util/service-helper'
import axios from 'axios'

class EditMerchant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            merchantsList: [],
            merchant: {
                merchantId: '',
                merchantName: '',
                merchantDescription: ''
            },
        };
    }

    getMerchants() {
        getMerchantList().then(res => {
            this.setState({ merchantsList: res.data });
        })
    }

    handleChangeInfo = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // UPDATE EXISTING MERCHANT
    updateMerchant() {

        let merchant = {
            merchantId: this.state.merchantId,
            merchantName: this.state.merchantName,
            merchantDescription: this.state.merchantDescription
          }

        axios.put("http://localhost:8080/bill-tracker/rest/merchants/", merchant)
            .then((res) => {
                console.log(res)
                console.log(res.data)
                // this.setState({
                //     showEditPopup: false, merchant: { merchantId: '', merchantName: '', merchantDescription: '' }
                // })
                window.location.reload();
        });
    }

    render() {
        return (
            // DISPLAY MERCHANT TO BE EDITED
            <div className='popup'>
                <div className='popup_inner'>
                    <button className="close-form-button" onClick={this.props.closePopup}>X</button>
                    <h2>Edit Merchant</h2>
                    <form>
                        <label className="form-label">Merchant</label>
                        <br /><input type="text" name="merchantName" value={this.merchantName} onChange={(e) => {
                            let { merchant } = this.state;
                            merchant.merchantName = e.target.value;
                            this.setState({ merchant });
					    }} />
                        <label className="form-label">Description</label>
                        <br /><input type="text" name="merchantDescription" value={this.merchantDescription} onChange={(e) => {
                            let { merchant } = this.state;
                            merchant.merchantDescription = e.target.value;
                            this.setState({ merchant });
					    }} /><br />
                        <button type="button" className="form-submit-button" onClick={this.updateMerchant()}>Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditMerchant;