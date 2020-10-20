import React from "react";


const Header = (props) =>(
    <div className={"cHeader"}>
        <h3>Where in the world?</h3>
        <button 
            className={"cDarkMode"} 
            onClick={this.handleDarkMode}>
            <i className="fa fa-moon-o" aria-hidden="true"></i>
            Dark Mode
        </button>
    </div>
)