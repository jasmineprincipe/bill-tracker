// import React, { Component } from 'react'

// class FilterForm extends Component {
//     constructor(props) {
//       super(props)
//       this.state = {
//         billFilter: ""
//       }
//     }
    
//     handleChange = (e) => {
//       this.setState({
//         billFilter: e.target.value
//       })
//       this.props.onChange(e.target.value)
//     }
    
//     render() {
//       return (
//         <div>
//           <label htmlFor="filter">Filter by Merchant</label>
//           <input type="text" id="filter" 
//             value={this.state.billFilter} 
//             onChange={this.handleChange}/>
//         </div>
//         )
//     }
//   }
  
//   export default FilterForm