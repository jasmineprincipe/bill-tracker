import React, { Component } from 'react';

class Header extends Component{
    render(){
        return(
            <div className="header-div">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous"></link>
            <i class="fas fa-chart-line"></i> BILL TRACKER
            </div>
        );
    }
}

export default Header;