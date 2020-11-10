import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";

import "./card.scss";

const Card = (props) =>{
    const {
        darkMode , name, flag, population, region, capital
    } = props
    return (
    <div className={darkMode ?"darkElement cCard":"lightElement cCard"}>
        <Link to={`/country/${name}`}>
            <img src={flag} alt={""}></img>
            <h3>{name}</h3>
            <p>Population: {population}</p>
            <p>Region: {region}</p>
            <p>Capital: {capital}</p>
        </Link>
    </div>
) 
}
const mapStateToProps = (state, ownProps) => {
    return  {...state,...ownProps}
    
}

export default connect(mapStateToProps, null)(Card)