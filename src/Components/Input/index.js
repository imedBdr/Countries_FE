import React from "react";
import {connect} from "react-redux";

import "./Input.scss";

const Input = (props) =>(
    <div className={props.darkMode?"cInput darkElement":"cInput lightInputElement"}>
        <i 
            className="fa fa-search" 
            aria-hidden="true">
        </i>
        <input 
            type={"text"}
            placeholder={"Search for a country..."}
            onChange={(e)=>props.handleSearch(e.target.value)}
            value={props.cValue}
            >
        </input>
    </div>
);

const mapStateToProps=(state,ownProps)=>{
    return{...state,...ownProps}
}

export default connect(mapStateToProps,null)(Input);
