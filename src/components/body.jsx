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
                    <h2>Sidenav Example</h2>
                    <p>This sidenav is always shown.</p>
                </div>
            </div>
        );
    }
}

export default Body;