import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Merchant from './merchant';
import '../css/body.css';

class Body extends Component {

    render() {

        let merchantsList = this.props.merchantsList;

        console.log('BODY COMPONENT');
        console.log(merchantsList);

        return (
            <div className='body-div'>
                
                <div class="sidenav">
                    <a href="#">Dashboard</a>
                    <a href="#">Bills</a>
                    <a href="#">Merchants</a>
                    <a href="#">History</a>
                </div>

                <h2 className="merchants-header">Merchants</h2>
                
                <div>
                        <button className="add-merchant-button">Add Merchant</button>
                </div>

                <div className='merchant-list-panel'>  
                    <ul className="merchant-list">
                        {merchantsList.map(merchant => {
                            return (
                                <li key={merchant.id}>
                                        <Merchant key={merchant.id} merchantName={merchant.merchantName} merchantDescription={merchant.merchantDescription}/>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
export default Body;