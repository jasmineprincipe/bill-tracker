import React, { Component } from 'react';
import Merchant from './merchant';
import '../css/body.css';
import '../css/merchant.css'

class MerchantsBody extends Component {

    render() {

        let merchantsList = this.props.merchantsList;

        console.log('BODY COMPONENT');
        console.log(merchantsList);

        return (
            <div className='body-div'>                
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
export default MerchantsBody;