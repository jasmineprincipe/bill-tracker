import React, { Component } from "react";
import { Forms } from './components/forms.jsx'
import { Tables } from './components/tables.jsx'
import { getMerchantList } from './util/service-helper';
 
class Merchants extends Component {

    constructor(props) {  
    super(props);
    
    this.state = {
        merchantsList: [],
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
      this.setState({merchantsList : res.data});
    }) 
  } 

  handleChangeInfo = e => {
    const {name, value} = e.target;

    this.setState((prevState) => ({
      user: {
        ...prevState.merchant,
        [name]: value
      }
    }));
  }

  handleAddMerchant = e => {

    let merchant = this.state.merchant;
    let merchantsList = [...this.state.merchantsList];

    merchantsList.push(merchant);

    this.setState({merchantsList : merchantsList});

    e.preventDefault();
  }

  deleteMerchant = rowIndex => {

    let merchantsList = [...this.state.merchantsList];

    merchantsList.splice(rowIndex, 1);

    this.setState({merchantsList: merchantsList});
  }

  render() {

    console.log('MERCHANTLIST: ');
    console.log(this.state.merchantsList);

    return (
      <div>
        <h1>Merchants</h1>

          <div className='forms-panel'>
            <Forms 
              handleChangeInfo={this.handleChangeInfo} 
              handleAddMerchant={this.handleAddMerchant} 
            />
          </div>
          
          <br/>

          <div className='table-panel'>
            <Tables merchantsList={this.state.merchantsList} deleteMerchant={this.deleteMerchant} />
          </div>
      </div>
    );
  }
}
 
export default Merchants;