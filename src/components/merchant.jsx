import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/merchant.css';

class Merchant extends Component {

    render() {
        return (
            <div className='merchant'>
                <p className='merchant-name'> {this.props.merchantName} - {this.props.merchantDescription}</p>
            </div>
        );
    }
}

Merchant.propTypes = {
    merchantName: PropTypes.string,
    merchantDescription: PropTypes.string
}

export default Merchant;