import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Tables extends Component { 

    render() {
    
        return (
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
                        this.props.merchantsList.map((merchant, index) =>{
                            return (
                                <tr className='merchant-table-row'>
                                    <th className='merchant-table-cell'>{merchant.merchantName}</th>
                                    <th className='merchant-table-cell'>{merchant.merchantDescription}</th>
                                    <th className='merchant-table-cell'><button type='button' onClick={() => this.props.deleteMerchant(index)}>Delete</button></th>
                                </tr>
                            )
                    })
                    }
                </tbody>
                </table>
            </Fragment>
        );
    }
}

Tables.propTypes = {
    deleteMerchant: PropTypes.func,
    merchantsList: PropTypes.func
}

export {
    Tables
}