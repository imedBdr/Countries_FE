import React from "react";
import {connect} from "react-redux";
import {TOOGLE_MODE} from "../../Redux/darkMode";

import "./Header.scss";

const Header = (props) =>(
    <div className={props.darkMode?"cHeader darkElement":"cHeader lightElement"}>
        <h3>Where in the world?</h3>
        <button 
            className={"cDarkMode"} 
            onClick={()=>props.handleDarkMode()}>
            <i className="fa fa-moon-o" aria-hidden="true"></i>
            Dark Mode
        </button>
    </div>
)

const mapStateToProps = (state, ownProps) => {
    return {
        ...state, ...ownProps
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleDarkMode: () => {
            dispatch(TOOGLE_MODE())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);