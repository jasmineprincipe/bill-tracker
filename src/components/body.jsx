import React, { Component } from 'react';

class Body extends Component{
    render(){
        return(
            <div className="body-div">
                <div class="sidenav">
                    <a href="#">Dashboard</a>
                    <a href="#">Bills</a>
                    <a href="#">Merchants</a>
                    <a href="#">History</a>
                </div>
                <div class="main">
                    <div class="current-bills-header">
                    <p>Bills - April 2019</p>
                    </div>
                    <div class="current-bills-table">
                    <table>
                    <tr>
                        <th>Merchant</th>
                        <th>Serial Number</th>
                        <th>Due Date</th>
                        <th>Amount</th>
                    </tr>
                    <tr>
                        <td>Meralco</td>
                        <td>324AS83</td>
                        <td>12 Apr 2019</td>
                        <td>3,000.00</td>
                    </tr>
                    <tr>
                        <td>Globe</td>
                        <td>124BD3</td>
                        <td>08 Apr 2019</td>
                        <td>3,000.00</td>
                    </tr>
                    <tr>
                        <td>Manila Water</td>
                        <td>6564BD3</td>
                        <td>27 Apr 2019</td>
                        <td>500.00</td>
                    </tr>
                    <tr>
                        <td>Meralco</td>
                        <td>324AS83</td>
                        <td>12 Apr 2019</td>
                        <td>3,000.00</td>
                    </tr>
                    <tr>
                        <td>Globe</td>
                        <td>124BD3</td>
                        <td>08 Apr 2019</td>
                        <td>3,000.00</td>
                    </tr>
                    <tr>
                        <td>Manila Water</td>
                        <td>6564BD3</td>
                        <td>27 Apr 2019</td>
                        <td>500.00</td>
                    </tr>
                    </table>
                    
                    </div>
                        <button className="add-bill-button">ADD NEW BILL</button>
                </div>
            </div>
        );
    }
}

export default Body;