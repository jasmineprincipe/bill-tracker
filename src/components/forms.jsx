import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Forms extends Component { 

    render() {
    
        return (
            <Fragment>
                <form>
                    Merchant: <br/> <input type="text" name="merchantName" onChange={this.props.handleChangeInfo} /><br/>
                    Description: <br/> <input type="text" name="merchantDescription" onChange={this.props.handleChangeInfo} /><br/>
                    <br/>
                    <button type="button" onClick={this.props.handleAddMerchant}>Add</button>
                </form>
            </Fragment>
        );
    }
}

Forms.propTypes = {
    handleChangeInfo: PropTypes.func,
    handleAddMerchant: PropTypes.func
}

export {
    Forms
}